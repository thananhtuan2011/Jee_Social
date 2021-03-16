import { AuthJwtService } from './../../../../../core/auth/_services/auth-jwt.service';
import { MychatService } from './../../../../pages/MyChat/mychat.service';
// Angular
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { AuthService } from '../../../../../core/auth/_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../../../../core/auth/_services/token-storage.service';
import { SharedService } from '../../../../../core/auth/_services/sharedata.service';
import { LayoutConfigService } from '../../../../../core/_base/layout/services/layout-config.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutUtilsService,MessageType } from '../../../../../core/_base/crud/utils/layout-utils.service';
@Component({
	selector: 'kt-user-profile3',
	templateUrl: './user-profile3.component.html',
	styleUrls: ['./user-profile3.component.scss']
	
})
export class UserProfile3Component implements OnInit {


	extrasUserOffcanvasDirection = 'offcanvas-right';
	user$: Observable<any>;
	// Public properties
	// user$: Observable<User>;
	list_userchat:any[]=[];
	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;
	item:any[]=[];
	listTT_user:any[]=[];
	id:any;
	id_user:number;
	email:string;
	pass:string;
	sharedData:string;
	testloadhinhanh :boolean=false;
	isReset: any;
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,
		public dialogRef: MatDialogRef<UserProfile3Component>,
		private AuthService:AuthService,
		private jwt_service:AuthJwtService,
		private tokenStore:TokenStorage,
		private sharedService:SharedService,
		private layout: LayoutConfigService,
		private dialog:MatDialog,
		private changeDetectorRefs: ChangeDetectorRef,
		 private	layoutUtilsService:LayoutUtilsService,
		 private mychat_serviecs:MychatService,
		private router: Router) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	binData()
	{
		this.sharedService.setData(this.email);

		this.sharedService.setDataPass(this.pass)
	}
	
	ngOnInit(): void {

		
		
	
		this.LoadData();
		this.loadTTuser();
		this.LoadListUserChat();
		this.isReset = setInterval(() => {
			this.resetSession();
		}, 240000);
	
		
	}

	resetSession() {	
		
		this.AuthService.resetSession().subscribe(
			response => {
				debugger
				if (response) {
					// response.data.Token = response.data.Token;
					this.jwt_service.storeAuthenticationToken(response.access_token,response.refresh_token,true);
				} else {
				//	clearInterval(this.isReset);
				this.jwt_service.storeAuthenticationToken(response.access_token,response.refresh_token,true);
					console.log('chay xuỗng clrear',this.isReset);
					//this.jwt_service.clear();
					// this.dialog.closeAll();
					this.router.navigate(['/login']);
				}
				// console.log('Test refresh',response);
			},
			err => {
				clearInterval(this.isReset);
				this.jwt_service.clear();
				// this.dialog.closeAll();
				this.router.navigate(['/login']);
			});
	}

	/**
	 * Log out
	 */
	LoadData() {
		
		this.tokenStore.getUserData().subscribe(res =>{
			debugger
			this.item= res;
			this.id_user=res.ID_user;
			// console.log(res)
			
			
		});

	
	}

		loadTTuser()
		{
			this.AuthService.getProFileUsers_change().subscribe(res =>{	

				this.listTT_user=res.data;
				console.log('list TT User',this.listTT_user)
				 this.changeDetectorRefs.detectChanges();
				// console.log('UUUUU',this.listTT_user);
			})
		}


	   TrangThaiUpdate(): User {
		  
		   
		   const user = new User();
		
			// debugger
		
		   user.TinhTrang =false;
		   this.changeDetectorRefs.detectChanges();
		   return user;
	   }
   
	   UpdateItem(item: User, withBack: boolean) {
		   // this.loadingAfterSubmit = true;
		   this.AuthService.updateTrangThaiUser(item).subscribe(res => {
			   if (res && res.status === 1) {
				// this.changeDetectorRefs.detectChanges();
				//    this.dialogRef.close({
				// 	   item
				//    });
			   }
			   else {
				   this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			   }
		   });
	   }
	logout() {
		this.AuthService.logout();
		this.jwt_service.logout();
		let updatetrangthai=this.TrangThaiUpdate();
		this.UpdateItem(updatetrangthai,false);
		this.changeDetectorRefs.detectChanges();
		this.router.navigate(['auth/login']);

	}

	test()
	{
		this.resetSession();
	}
	
	LoadListUserChat()
	{
		  this.mychat_serviecs.GetListUserChat(this.id_user).subscribe(res=>{
			this.list_userchat=res.data;
			console.log('mess',this.list_userchat);
			this.changeDetectorRefs.detectChanges();
		  })
	}
  
}
