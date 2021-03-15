import { AuthJwtService } from './../../../../core/auth/_services/auth-jwt.service';

// Angular
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
// RxJS
import { Observable, of, Subject } from 'rxjs';
import { finalize, first, mergeMap, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth

import { ErrorStateMatcher } from '@angular/material/core';
import { MatTabGroup } from '@angular/material';
import { AuthService } from '../../../../core/auth/_services/auth.service';
import { TokenStorage } from '../../../../core/auth/_services/token-storage.service';
import { SharedService } from '../../../../core/auth/_services/sharedata.service';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../../../core/auth/_models/user.model'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LayoutUtilsService,MessageType } from '../../../../core/_base/crud/utils/layout-utils.service';
import { result } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';


/**
 * ! Just example => Should be removed in development
 */
// const DEMO_PARAMS = {
// 	EMAIL: 'admin@demo.com',
// 	PASSWORD: 'demo'
// };
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
	  const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
	  const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
  
	  return (invalidCtrl || invalidParent);
	}
  }
@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	@Input() thongbao:string;
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	sharedData: string;
	sharedPass:string;
	txtpass:string;
	txtemail:string;
	checked:boolean=false;
	private unsubscribe: Subject<any>;

	private returnUrl: any;
	checkmenber:boolean;

	// login

	txtpasstem:string;
	txtemailtem:string;
	check:boolean=false;
	name:string='';
	Pass:string='';
	ConfirmPass:string='';
	registerEmail:string='';
	id:any;
	item: User;
	listID:any[]=[];
	

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private router: Router,
		private auth: AuthService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private tokenget:TokenStorage,
		private sharedService:SharedService,
		private changeDetectorRefs: ChangeDetectorRef,
		private layoutUtilsService: LayoutUtilsService,
		private authJwtService: AuthJwtService,
	
	) {
		
		 let token=this.authJwtService.getToken();
		//redirect(chuyền hướng) về home nếu đã đăng nhâp
		if (token) {
            this.router.navigate(['/']);
		}
		console.log('token',token);
		this.unsubscribe = new Subject();
		this.loginForm = this.formBuilder.group({
			pass: ['', Validators.compose([

				Validators.required,
				Validators.minLength(6),
				
			])
		],
		
					
					
			 gmail: ['', [Validators.required]],
			// gmail: ['', [Validators.email]],
			checked: [false, Validators.compose([Validators.required])]
	});

	
		
	
	}





	
	
		// nhận  lại binData
		getData(){
			
			this.sharedService.currentMessagelogin.subscribe(sharedata => this.txtemailtem = sharedata)

			this.sharedService.passbindlogin.subscribe(pass => this.txtpasstem = pass)


			this.txtemail=this.txtemailtem;
				this.txtpass=this.txtpasstem;
		}




	// bing data từ ngModel trong html đi ra ngoài
	binData()
	{
		this.sharedService.setData(this.txtemail);

		this.sharedService.setDataPass(this.txtpass)
	
	}

	checkRemember(){
		const controls = this.loginForm.controls;
		if(controls['checked'].value)
		
		{
			this.checkmenber=true;
			  this.sharedService.currentMessage
				 .subscribe(sharedData => this.sharedData = sharedData);

			
			
				this. binData();
		
		}
		
		

	

	}


	ngOnInit(): void {const controls = this.loginForm.controls;
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
		//this.checkRemember();
		

		
			this.getData();
			
		
	}

	


	
	
	// }
	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	
	/**
	 * Form Submit
	 */
	layidUser(){

	
	//  this.auth.getIdUser(this.loginForm.value['gmail'], this.loginForm.value['pass']).subscribe(res => {
	// 		// console.log(res)
	// 		if (res) {
				
	// 			 debugger
	// 			 this.id = res.Data[0].ID_user;
			
	// 			this.changeDetectorRefs.detectChanges();
				
	// 		}
	// 	});


	this.tokenget.getUserData().subscribe(res=>{
	
		this.id=res.customData.Id;
		console.log('Data:',res);
	
	this.changeDetectorRefs.detectChanges();

	});
	
	
	}
	TrangThaiUpdate(): User {
		// debugger
	
	
		//const controls = this.itemForm.controls;
		
		const user = new User();
		// user.ID_User = this.item.ID_User;

		
	
		 //debugger
		 user.ID_User =	this.id;
		user.TinhTrang =true;
		
		return user;
	}
	UpdateItem(item: User, withBack: boolean) {
		// this.loadingAfterSubmit = true;
		this.auth.updateTrangThaiUser(item).subscribe(res => {
			if (res && res.status === 1) {
				// this.changeDetectorRefs.detectChanges();
			}
			else {
				this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			}
		});
	}

 
	submit() {
		let authData = {
			username: this.loginForm.value['gmail'].trim(),
			password: this.loginForm.value['pass'].trim()
		
		};
		this.auth.login(authData) 
		.pipe(
			tap(({access_token}) => {
			  this.authJwtService.storeAuthenticationToken(
				access_token,
				true
			  );
			}),
		
		  )
		  .subscribe({
			next: value => {
			  console.log(value);
			  this.authJwtService.saveAccessData(value.user.customData)
			  console.log('customData',value.user.customData);
			  
			  this.router.navigate(['/']);
			},
			error: (err: HttpErrorResponse) => {
			  let errorMsg = err.error.detail;
			  errorMsg =
				errorMsg ||
			
		
			  console.log(err);
			}
		})
	}


   

			

			
	// submit() {
	
	
	// 	this.checkRemember();
	// 	if(this.loginForm.value['gmail'].trim().toLowerCase()=="admin@gmail.com"&&this.loginForm.value['pass'].trim().toLowerCase()=="000000")
	// 	{
	// 		this.auth.login(this.loginForm.value['gmail'].trim(),this.loginForm.value['pass'].trim()).pipe(first()).subscribe(response => {
	// 			if (typeof response !== 'undefined' && response.status !== 0) {
	// 				this.tokenget.setUserData(response.data)
	// 				this.layidUser();
					
	// 				let updatetrangthai=this.TrangThaiUpdate();
	// 				this.UpdateItem(updatetrangthai,false);
				
					
	// 				this.router.navigate(['/Administrator']);
	// 			} 
				
				
	// 			else {
	// 				alert("Tài khoản Admin không hợp lệ !");
	// 			}
			
			
	// 		});
	// 	}
	// 	else

	// 	{

	// 		this.auth.login(this.loginForm.value['gmail'].trim(),this.loginForm.value['pass'].trim()).pipe(first()).subscribe(response => {
	// 			if (typeof response !== 'undefined' && response.status !== 0) {
	// 				this.tokenget.setUserData(response.data)
	// 				// this.layidUser();
					
	// 				// let updatetrangthai=this.TrangThaiUpdate();
	// 				// this.UpdateItem(updatetrangthai,false);
				
					
	// 				this.router.navigate(['/']);
	// 			} 
				
				
	// 			else {
	// 				alert("Tài khoản hoặc mật khẩu không đúng !");
	// 			}
			
			
	// 		});
	// 	}

	// }

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
