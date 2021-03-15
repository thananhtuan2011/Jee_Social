import { AuthJwtService } from './../../../core/auth/_services/auth-jwt.service';
// Angular
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { DateAdapter, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorIntl, MatTabsModule, MatToolbarModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '../../../core/_base/crud/';
// Module components
import { AuthComponent } from './auth.component';


import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService, } from '../../../core/auth';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
const routes: Routes = [

		{ path: '', component: AuthComponent,
		 children: [
			{ path: '', redirectTo: 'login',pathMatch: 'full' },
			{ path: 'login', component: LoginComponent, data: { label: 'Login' } },
			// { path: 'register', component: RegisterComponent, data: { label: 'Register' } }
	  	] 
	
	}
	// {

		
	// 	//  path: '', loadChildren: () => import('../app/views/pages/auth/user/UserModule').then(m => m.UserModule)
		
	// 	path: 'auth',
	// 	component: AuthComponent,
	// 	children: [
	// 		{
	// 			path: '',
	// 			redirectTo: 'login',
	// 			pathMatch: 'full'
	// 		},
	// 		{
	// 			path: 'login',
	// 			component: LoginComponent,
	// 			data: {returnUrl: window.location.pathname}
	// 		},
	// 		{
	// 			path: 'register',
	// 			component: RegisterComponent
	// 		},
	// 		// {
	// 		// 	path: 'user',
	// 		// 	component: UserComponent,
	// 		// 	children:[
	// 		// 		 { path: "", redirectTo: "login" },
	// 		// 		{
	// 		// 			path: 'login',component:LoginComponent,data:{label:"Login"},
	// 		// 		},

	// 		// 		{
	// 		// 			path: 'register',component:RegisterComponent,data:{label:"Register"},
	// 		// 		}
	// 		// 	]
	// 		// },
	// 		{
	// 			path: 'forgot-password',
	// 			component: ForgotPasswordComponent,
	// 		}
	// 	]
	// }
];

const dialogMock = {
    close: () => { }
   };

@NgModule({
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	  ],
	imports: [

		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects]),
		MatToolbarModule,
		MatIconModule,
		MatTabsModule,
		MatCardModule,
		MatDialogModule
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},

		{
			provide: MatDialogRef,
			useValue: {dialogMock}
		  },
		  { provide: MAT_DIALOG_DATA, useValue: [] }
		  
	
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		 AuthNoticeComponent,
		
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard,
			
				CookieService
				
			]
		};
	}
}
