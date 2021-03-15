import { TokenStorage } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';

const jwtHelperService = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthJwtService {
  constructor(private http: HttpClient, private cookieService: CookieService,
    private tokenStorage: TokenStorage,
    
    
    
    ) {}
  private accessToken: string = null;

  initialize() {
    const token = this.cookieService.get('authenticationToken');
    if (token) {
      const isExpired = jwtHelperService.isTokenExpired(token, 10);
      if (isExpired) {
        this.cookieService.delete('authenticationToken');
      } else {
        this.accessToken = token;
      }
    }
  }

 

  getToken(){
    const token = this.cookieService.get('authenticationToken');
    return token;
  }

  setData(value: any) {
    const data = this.cookieService.set('currentUser',value);
    return data;
  }


 saveAccessData(response: any) {
if (response) {
  this.tokenStorage.updateStorage(response);
}
else {
  throwError({ msg: 'error' });
}
} 
  storeAuthenticationToken(jwt: string, rememberMe?: boolean) {
    if (rememberMe) {
      const expiredTime = jwtHelperService.getTokenExpirationDate(jwt);
      // this.cookieService.set('authenticationToken', jwt, expiredTime);
      // this.cookieService.set('authenticationToken', jwt,expiredTime,null,null, true, 'Lax');
      this.cookieService.set( 'authenticationToken', jwt,expiredTime,'/' ,null,true,"Strict"); 
     
      this.accessToken = jwt;
    } else {``
      this.cookieService.set('authenticationToken', jwt);
    }
  }

  logout(): void {
    this.cookieService.delete('authenticationToken');
    this.accessToken = null;
  }
}
