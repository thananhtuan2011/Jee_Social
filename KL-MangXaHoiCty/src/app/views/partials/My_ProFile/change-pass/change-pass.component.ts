import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';
import { AuthService } from './../../../../core/auth/_services/auth.service';

import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { ConfirmPasswordValidator } from './../../../pages/auth/register/confirm-password.validator';
// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';

import { MatDialogRef, MatTabGroup } from '@angular/material';
import { SharedService } from '../../../../core/auth/_services/sharedata.service';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'kt-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  // registerForm: FormGroup;
  registerForm = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
 
	loading = false;
	errors: any = [];
	// biến show hide của password
  hide1 = true;
  hide2 = true;
  hide3 = true;
	txtemail:string;
	
	//bing dữ liệu
	sharedData: string; //  dữ liệu cầN share
  id_user:number;
  item:any[]=[];
  listTT_user:any[]=[];
  mkhientai:string;
 
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

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
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
    private  sharedService: SharedService,
    private tokenStorage:TokenStorage,
    private _services:ProfileService,
    private	layoutUtilsService:LayoutUtilsService,
    public dialogRef: MatDialogRef<ChangePassComponent>,
   
	
	) {
		this.unsubscribe = new Subject();
		this.initRegisterForm();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
  getCurrentUser() 
  {
    this.tokenStorage.getUserData().subscribe(res =>{
     
        this.item= res;
	
     this.id_user=res.ID_user;
     
     
		
        this.cdr.detectChanges();
   
        
    });
  }
	loadTTuser()
		{
			this.auth.getProFileUsers_change().subscribe(res =>{	

        this.listTT_user=res.Data;
        this.mkhientai=this.listTT_user[0].Password;
				this.cdr.detectChanges();
				console.log('UUUUU',this.listTT_user);
			})
		}
  
   
	ngOnInit() {
    this.getCurrentUser();
    this.loadTTuser();
  
		// this.initRegisterForm();
		//bin dtaa
		//  this.sharedService.currentMessage
		//  .subscribe(sharedData => this.sharedData = sharedData);
  }
  
  
  TrangThaiUpdate(): User {
		  
		   
    const user = new User();
 
   // debugger
    user.TinhTrang =false;
    this.cdr.detectChanges();
    return user;
  }
  UpdateItem(item: User, withBack: boolean) {
    // this.loadingAfterSubmit = true;
    this.auth.updateTrangThaiUser(item).subscribe(res => {
      if (res && res.status === 1) {
        this.dialogRef.close({
          item
        });
      }
      else {
        this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
      }
    });
  }

  logout() {
		this.auth.logout();
		let updatetrangthai=this.TrangThaiUpdate();
		this.UpdateItem(updatetrangthai,false);
	
		this.router.navigate(['auth/login']);

	}
onSubmit()
{
  const controls = this.registerForm.controls;
  if(this.mkhientai===controls['crpassword'].value)
  {
    this._services.ChangePass(this.id_user,controls['password'].value).subscribe(res =>{

      this.cdr.detectChanges();
      this.logout();

      
    })
    
    
  }
  else
  {
    alert('Mật khẩu hiện tại không hợp lệ !')
  }
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
    
      
      crpassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(100)
			])
			
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(100)
			])
			
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(100)
			])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}
// đẩy dữ liệu ra 
	

	/**
	 * Form Submit
	 */


	submit() {
		const controls = this.registerForm.controls;
		// check form
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		// debugger
		if (!controls['agree'].value) {
      
      
      alert("Vui lòng check agree !")
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			//this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}

		const _user: User = new User();
		_user.clear();
		_user.email = controls['gmail'].value;
		_user.username = controls['username'].value;
		// _user.address = controls['address'].value;
		
	}

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
