// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { MatTabGroup } from '@angular/material';
import { SharedService } from '../../../../core/auth/_services/sharedata.service';


@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	// biến show hide của password
	hide = true;
	txtemail:string;
	txtpass:string;
	//bing dữ liệu
	sharedData: string; //  dữ liệu cầN share
	

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
	ngOnInit() {
		// this.initRegisterForm();
		//bin dtaa
		//  this.sharedService.currentMessage
		//  .subscribe(sharedData => this.sharedData = sharedData);
	}
	// binData()
	// {
	// 	this.sharedService.setData(this.txtemail);
	// 	this.sharedService.setDataPass(this.txtpass)
	// }



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
			// fullname: ['', Validators.compose([
			// 	Validators.required,
				
			// 	Validators.maxLength(100)
			// ])
			// ],
			gmail: ['', Validators.compose([
				Validators.required,
				Validators.email,
			
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			
			]),
			],

			phone: ['', Validators.compose([
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(11)
			])
			],
			address: ['', Validators.compose([
				Validators.required,
			
				// Validators.maxLength(100)
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
			
				// Validators.maxLength(100)
			]),
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
			
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}

		const _user: User = new User();
		_user.clear();
		_user.email = controls['gmail'].value;
		_user.username = controls['username'].value;
		// _user.address = controls['address'].value;
		_user.password = controls['password'].value;
		_user.roles = [];
		this.auth.register(_user).pipe(
			tap(user => {
				if (user) {
					this.store.dispatch(new Register({authToken: user.accessToken}));
					// pass notice message to the login page
					this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
				
				
					this.router.navigateByUrl('/auth/login');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		).subscribe();
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

