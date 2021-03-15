import { locale } from './../../../../../core/_config/i18n/de';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { AuthService } from '../../../../../core/auth/_services/auth.service';

import { AuthNoticeService } from './../../../../../core/auth/auth-notice/auth-notice.service';

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { Router } from '@angular/router';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { GroupModel } from '../../Bai-Dang/Model/group.model';
import { UserGroupModel } from '../group_user.model';



@Component({
  selector: 'kt-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	listUser: any[] = [];
	// biến show hide của password
	hide = true;
	txtemail:string;
	txtpass:string;
	//bing dữ liệu
	sharedData: string; //  dữ liệu cầN share
	
	@ViewChild('Assign', { static: true }) myPopover_Assign: PopoverContentComponent;
	selected: any[] = [];
	selected_Assign: any[] = [];
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	@ViewChild('hiddenText', { static: true }) textEl: ElementRef;
	@ViewChild('hiddenText_Assign', { static: true }) text_Assign: ElementRef;

	options: any = {};
	options_assign: any = {};
	_color: string = '';
	_Follower: string = '';
	_Assign: string = '';
	list_Assign: any[] = [];
	list_id_user=[];
	id_user:number;
	listTT_user:any[] = [];
	@Output() ItemSelected = new EventEmitter<any>();
	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private tokenStore:TokenStorage,
		private authNoticeService: AuthNoticeService,
		private router:Router,
		private changeDetectorRefs: ChangeDetectorRef,
		private auth:AuthService,
		private _services:GroupService,
		private layoutUtilsService: LayoutUtilsService,
		
	
	) {
		this.unsubscribe = new Subject();
		this.initRegisterForm();
	}

	user:any[]=[];

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	GetCurrentUser() {
		// debugger
		this.tokenStore.getUserData().subscribe(res =>{
		  
		  this.user=res;
		  this.id_user=res.ID_user;
		  
		});

	  }

	  select(user) {
		this.ItemSelected.emit(user)
	}
	  onSearchChange_Assign($event) {
		this._Assign = (<HTMLInputElement>document.getElementById("InputAssign")).value;

		if (this.selected_Assign.length > 0) {
			var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
			var match = this._Assign.match(reg);
			if (match != null && match.length > 0) {
				let arr = match.map(x => x);
				this.selected_Assign = this.selected_Assign.filter(x => arr.includes('@' + x.Username));
			} else {
				this.selected_Assign = [];
			}
		}
		this.options = this.getOptions_Assign();
		if (this.options.keyword) {
			let el = $event.currentTarget;
			let rect = el.getBoundingClientRect();
			this.myPopover_Assign.show();
			this.changeDetectorRefs.detectChanges();
		}

		
	}
	
	
	getKeyword_Assign() {
		let i = this._Assign.lastIndexOf('@');
		if (i >= 0) {
			let temp = this._Assign.slice(i);
			if (temp.includes(' '))
				return '';
			return this._Assign.slice(i);
		}
		return '';
	}
	getOptions_Assign() {
		var options_assign: any = {
			showSearch: false,
			keyword: this.getKeyword_Assign(),
			data: this.listUser.filter(x => this.selected_Assign.findIndex(y => x.id_nv == y.id_nv) < 0),
		};
		return options_assign;
	}

	ItemSelected_Assign(data) {
		this.selected_Assign = this.list_Assign;
		this.selected_Assign.push(data);
		let i = this._Assign.lastIndexOf('@');
		this._Assign = this._Assign.substr(0, i) + '@' + data.Username + ' ';
		this.list_id_user.push({ 
			id:data.ID_user
		})
		this.myPopover_Assign.hide();
		let ele = (<HTMLInputElement>document.getElementById("InputAssign"));
		ele.value = this._Assign;
		ele.focus();
		this.changeDetectorRefs.detectChanges();
	}


	 	item_user_group_admin():UserGroupModel
	{
		const item = new UserGroupModel();


		const controls = this.registerForm.controls;
	
		
				item.Id_Group=0;
				// item.id_user=this.id_user;
				item.quyen_group=true;
		
		this.changeDetectorRefs.detectChanges();
		return item;
	}
	Adduser_admin(item:UserGroupModel,withBack:boolean){
		for(let i=0;i<this.list_id_user.length;i++)
		{
			//debugger
			this.id_user=this.list_id_user[i].id;
		
	
		this._services.InsertUserGroup(0,this.id_user,item).subscribe(res=>{
			if (res && res.status === 1) {
				
					 }
					 else {
						 this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
					 }
		})
	}
}


				Group_user_Insert()
				{
					

					
					let it_gr_u=this.item_user_group_admin();
					this.Adduser_admin(it_gr_u,false);
					

					
				}



	Item_Group(): GroupModel {
		//debugger
		const item = new GroupModel();


		const controls = this.registerForm.controls;
		
				item.ten_group= controls['tengroup'].value;
				item.CreatedBy=this.id_user;
				 item.avatar_group='';
				 item.CreatedDate=null;
				 item.UpdatedBy=null;
				 item.UpdatedDate=null;
		
	

				
			

			
		
		this.changeDetectorRefs.detectChanges();
		return item;
	}
	
	
	// test(){
	// 	this.datainput.push({ data:""});
	// 	console.log('Data',this.datainput)
	// }
	
	// Bắt đầu phần comment
	
	AddGroup(item:GroupModel,withBack:boolean){
	
			this._services.InsertGroup(item).subscribe(res=>{
				if (res && res.status === 1) {
					// this.dulieu_cmt.setValue("");
					// this.loadDataList();
					// this.dialogRef.close();
				   //  this.dataSource.loadListBaiDang();
				   		 window.location.href ='/home'
					
						 }
						 else {
							 this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
						 }
			})
	}
	
				GroupInsert()
				{
	
					let it_gr=this.Item_Group();
					this.AddGroup(it_gr,false);
				
					
				}


				Test()
				{
					alert("CCC")
				}

	  submit() {
		const controls = this.registerForm.controls;

		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		
		if (!controls['agree'].value) {

			
			
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			this.loading = true;
			return;
		}
			this.GroupInsert();
			this.Group_user_Insert()
	
			// window.location.href ='/home'

			
			

	
	}

	  loadListUser()
	  {
			this.auth.getAllUsers().subscribe(res=>{
				this.listUser=res.Data;
			})
	  }


	  loadTTuser()
	  {
		  this.auth.getProFileUsers_change().subscribe(res =>{	

			  this.listTT_user=res.data;
			  this.changeDetectorRefs.detectChanges();
			  
		  })
	  }
	ngOnInit() {
		this.GetCurrentUser();
		this.loadListUser();
		this.loadTTuser();
	
	}
	
	



	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			
		
			tengroup: ['', Validators.compose([
				Validators.required,
			
				// Validators.maxLength(100)
			]),
			
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			
		});
	}
// đẩy dữ liệu ra 
	

	/**
	 * Form Submit
	 */


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	
}
