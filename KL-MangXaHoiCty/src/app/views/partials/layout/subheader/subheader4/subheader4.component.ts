import { CreateThongdiepComponent } from './../../../../pages/home/thong-diep/create-thongdiep/create-thongdiep.component';
import { LayoutUtilsService } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { CreateGroupComponent } from './../../../../pages/home/Group/create-group/create-group.component';
// Angular
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { SubheaderService } from '../../../../../core/_base/layout';
import { Breadcrumb } from '../../../../../core/_base/layout/services/subheader.service';

@Component({
	selector: 'kt-subheader4',
	templateUrl: './subheader4.component.html',
	styleUrls: ['./subheader4.component.scss']
})
export class Subheader4Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	@Input() fluid: boolean;
	@Input() clear: boolean;

	today: number = Date.now();
	title = '';
	desc = '';
	breadcrumbs: Breadcrumb[] = [];
		chucvu:string;
	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(public subheaderService: SubheaderService,
		private dialog:MatDialog,
		private changeDetectorRefs: ChangeDetectorRef,
		private tokenStore:TokenStorage,
		private layoutUtilsService: LayoutUtilsService,

		
		
		) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */

	GetCurrentUser() {
		// debugger
		this.tokenStore.getUserData().subscribe(res =>{
		//   this.item= res;
		  this.chucvu=res.chucvu;
		});
	   
	  }
	CreateGroup()
	{
		const dialogRef = this.dialog.open(CreateGroupComponent, {
			width: '600px',
			height:'500px',
			data: {}
		  });
	}


	ShowMesss() {
		if(this.chucvu=='Giám Đốc'||this.chucvu=='Phó giám đốc')
		{
			const dialogRef = this.dialog.open(CreateThongdiepComponent, {
				width: '600px',
				// height:'500px',
				data: {}
			  });
		}
		else

		{
			this.layoutUtilsService.showInfo("Bạn không có quyền truy cập chức năng này ");
		}
		
	}
	ngOnInit() {
		this.GetCurrentUser();
		
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
			// breadcrumbs title sometimes can be undefined
			if (bt) {
				Promise.resolve(null).then(() => {
					this.title = bt.title;
					// this.desc = bt.desc;
				});
			}
		}));

		this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
			Promise.resolve(null).then(() => {
				this.breadcrumbs = bc;
			});
		}));
	}


	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
