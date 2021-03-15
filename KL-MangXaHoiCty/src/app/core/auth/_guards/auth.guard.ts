import { AuthJwtService } from './../_services/auth-jwt.service';
import { environment } from './../../../../environments/environment.prod';
import { TokenStorage } from './../_services/token-storage.service';
// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';
import { AuthService } from '../_services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router,
        private tokenStorage: TokenStorage,
		private AuthService: AuthService,
		private jwt_service: AuthJwtService
		
		) {
            /* khi chạy lên thì nó sẽ vào đây check kiểm tra xem đã có user 
             nào hay  chưa nếu có rồi thì có thể load các page còn chưa thì bắt buộc phải đăng nhập*/
        // this.AuthService.logout();
        //     this.router.navigate(['/login']);
       
     }


     async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		 let token=this.jwt_service.getToken();
		//let token =  this.tokenStorage.getAccessToken().toPromise()
		 if (token && this.isTokenExpired()) {
			//  if (test===1) {
			// logged in so return true
			
			 if (state.url.startsWith('/auth')||state.url.startsWith('/auth/login'))
				this.router.navigateByUrl('/');
			return true;
		}
		// not logged in so redirect to login page with the return url
		// if (state.url.startsWith('/auth'))
		// 	// this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
			this.router.navigate(['/auth/login']);
		// else
		// 	return true;
		return false;
	}

	getToken(): string {
		return localStorage.getItem('accessToken');
	}

	getTokenExpirationDate(token: string): Date {
		// token = atob(token);
		const decoded = jwt_decode(token);

		if (decoded.exp === undefined) return null;

		const date = new Date(0);
		date.setUTCSeconds(decoded.exp);
		return date;
	}

	isTokenExpired(token?: string): boolean {
		if (!token) token =this.jwt_service.getToken();
		if (!token) return false;

		const date = this.getTokenExpirationDate(token);
		if (date === undefined) return false;
		return (date.valueOf() > new Date().valueOf());
	}
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //     const currentUser = this.AuthService.currentUserValue;
    //     if (currentUser) {
    //         // logged in so return true
	// 		return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/auth']);
    //     return false;
    // }

    // const currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser) {
    //         // logged in so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

    }


