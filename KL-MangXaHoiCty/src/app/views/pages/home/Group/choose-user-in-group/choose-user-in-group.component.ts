import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { LayoutUtilsService } from './../../../../../core/_base/crud/utils/layout-utils.service';
// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// Material
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material';
// RxJS
import { Observable, BehaviorSubject, Subscription, ReplaySubject } from 'rxjs';
// NGRX
// Service
import { AuthService } from '../../../../../core/auth/_services/auth.service';
//Models

@Component({
  selector: 'kt-choose-user-in-group',
  templateUrl: './choose-user-in-group.component.html',
  styleUrls: ['./choose-user-in-group.component.scss']
})
export class ChooseUserInGroupComponent implements OnInit {
	// Public properties
	tam:string;
	id_gr:number;
	@Input() options: any = {
		showSearch: true,//hiển thị search input hoặc truyền keyword
		keyword: '',
		data: []
	};
	@Output() ItemSelected = new EventEmitter<any>();
	@Output() IsSearch = new EventEmitter<any>();

	listUser: any[] = [];
	public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
	public userFilterCtrl: FormControl = new FormControl();
	constructor(
		private FormControlFB: FormBuilder,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
		public auth: AuthService,
		public service_: GroupService,
		private sharedService:SharedService,
		private changeDetectorRefs: ChangeDetectorRef) { }

	/**
	 * On init
	 */
	getData(){
			
		this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)
		this.id_gr=Number(this.tam);
		this.changeDetectorRefs.detectChanges();
	
	
	  }
	ngOnInit() {
	
		this.userFilterCtrl.valueChanges
			.pipe()
			.subscribe(() => {
				this.filterUsers();
      });
      
   console.log('User:',this.filteredUsers)
	}
	ngOnChanges() {
    	this.getData();
		this.userFilterCtrl.setValue('');
		this.listUser = [];

		if (this.options.showSearch == undefined)
			this.options.showSearch = true;
		if (this.options != undefined) {
			if (this.options.data) {
				this.listUser = this.options.data;
				this.filterUsers();
				this.changeDetectorRefs.detectChanges();
			} else {
				this.service_.getAllChooseUsser_In_Group(this.id_gr,{}).subscribe(res => {
					if (res && res.status === 1) {
						this.listUser = res.data;
						// mảng idnv exclude
						if (this.options.excludes && this.options.excludes.length > 0) {
							var arr = this.options.excludes;
							this.listUser = this.listUser.filter(x => !arr.includes(x.ID_user));
						}
						this.filterUsers();
						this.changeDetectorRefs.detectChanges();
					};
				});
			}
		}
		if (!this.options.showSearch)
			this.filterUsers();

	}
	protected filterUsers() {
		if (!this.listUser) {
			return;
		}

		let search = !this.options.showSearch ? this.options.keyword : this.userFilterCtrl.value;
		if (!search) {
			this.filteredUsers.next(this.listUser.slice());
			return;
		} else {
			search = search.toLowerCase();
		}
		// filter the banks
		if (search[0] == '@') {
			this.filteredUsers.next(
				this.listUser.filter(bank => ("@" + bank.Username.toLowerCase()).indexOf(search) > -1)
			);
		}
		else {
			this.filteredUsers.next(
				this.listUser.filter(bank => bank.Username.toLowerCase().indexOf(search) > -1)
			);
		}
	}
	select(user) {
		this.ItemSelected.emit(user)
	}
	stopPropagation(event) {
		this.IsSearch.emit(event)
	}

}
