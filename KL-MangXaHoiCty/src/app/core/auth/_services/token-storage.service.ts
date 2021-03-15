import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {
	// /**
	//  * Get access token
	//  * @returns {Observable<string>}
	//  */
	// public getAccessToken(): Observable<string> {
	// 	const token: string = <string>localStorage.getItem('accessToken');
	// 	return of(token);
	// }

	// /**
	//  * Set access token
	//  * @returns {TokenStorage}
	//  */
	// public setAccessToken(token: string): TokenStorage {
	// 	localStorage.setItem('accessToken', token);
	// 	return this;
    // }
    
  
	/**
	 * Get access token
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {

		const token: string = <string>localStorage.getItem('accessToken');
		return of(token);
	}
	public getAccessTokenString(): string {
		const token: string = <string>localStorage.getItem(environment.authTokenKey);
		return token;
	}
  	/**
	 * Set access token
	 * @returns {TokenStorage}
	 */
	public setAccessToken(token: string): TokenStorage {
		localStorage.setItem('accessToken', token);
		return this;
	}
	
	
		/**
	 * Set refresh token
	 * @returns {TokenStorage}
	 */
	public setRefreshToken(token: string): TokenStorage {
		localStorage.setItem('refreshToken', token);
		return this;
	}

	/**
	 * Get refresh token
	 * @returns {Observable<string>}
	 */
	public getRefreshToken(): Observable<string> {
		const token: string = <string>localStorage.getItem('refreshToken');
		return of(token);
	}

	/**
	 * Get pageSize
	 * @returns {Observable<string>}
	 * 
	 * 
	 * 
	 * 
	 */

	

	public setUserData(data: any): TokenStorage {
		localStorage.setItem('currentUser', JSON.stringify(data));
		return this;
	}

	//get dữ liệu từ api
	public getUserData(): Observable<any> {
		const user: any = <any>localStorage.getItem('currentUser');
		return of(JSON.parse(user));
	}

	///get user theo user


	public getPageSize(): Observable<string> {
		const size: string = "10";
		return of(size);
	}


	public setIDUser(iduser: string): TokenStorage {
		localStorage.setItem('idUser', iduser);
		return this;
	}

	public getIDUser(): Observable<string> {
		const Id: string = <string>localStorage.getItem('idUser');
		return of(Id);
	}

	public setUserNameUser(username:string): TokenStorage {
		localStorage.setItem('currentUser', username);
		return this;
	}

	public getUserNameUser(): Observable<string> {
		const username: string = <string>localStorage.getItem('Username');
		return of(username);
	}


	/**
	 * Get user roles in JSON string
	 * @returns {Observable<any>}
	 */
	public getUserRoles(): Observable<any> {
		const roles: any = localStorage.getItem('userRoles');
		try {
			return of(JSON.parse(roles));
		} catch (e) {}
	}

	/**
	 * Set user roles
	 * @param roles
	 * @returns {TokenStorage}
	 */
	public setUserRoles(roles: any): any {
		if (roles != null) {
			localStorage.setItem('userRoles', JSON.stringify(roles));
		}
		return this;
	}

	/**
	 * Remove tokens
	 */
	public clear() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userRoles');
		//localStorage.removeItem('idUser');
	}

	public setLogoCus(iduser: string): TokenStorage {
		localStorage.setItem('LogoCus', iduser);
		return this;
	}

	public getLogoCus(): Observable<string> {
		const Id: string = <string>localStorage.getItem('LogoCus');
		return of(Id);
	}

	/**
	 * Get user roles in JSON string
	 * @returns {Observable<any>}
	 */
	public getMenuRoles(): Observable<any> {
		const roles: any = localStorage.getItem('menuRoles');
		try {
			return of(JSON.parse(roles));
		} catch (e) {}
	}

	/**
	 * Set user roles
	 * @param roles
	 * @returns {TokenStorage}
	 */
	public setMenuRoles(roles: any): any {
		if (roles != null) {
			localStorage.setItem('menuRoles', JSON.stringify(roles));
		}
		return this;
	}

	/**
	 * Set Url of cookie
	 * @param roles
	 * @returns {TokenStorage}
	 */
	public setUrl(roles: any): any {
		if (roles != null) {
			localStorage.setItem('url', JSON.stringify(roles));
		}
		return this;
	}

	
	/**
	 * Get Url of cookie
	 * @returns {Observable<any>}
	 */
	public getUrl(): Observable<any> {
		const roles: any = localStorage.getItem('url');
		try {
			return of(JSON.parse(roles));
		} catch (e) {}
	}


	public setUserCustomer(iduser: string): TokenStorage {
		localStorage.setItem('Username', iduser);
		return this;
	}

	public getUserCustomer(): Observable<string> {
		const Id: string = <string>localStorage.getItem('Username');
		return of(Id);
	}

	public clearItem(item) {
		localStorage.removeItem(item);
	}
	public updateStorage(data) {
		this.clearItem("currentUser");
		let accessData = {
			// accessToken: data.Token,
			username: data.username,
			fullname: data.FullName,
			roles: data.Rules,
			id: data.Id,
			avata: data.Avata,
			
			email: data.Email,
			sdt: data.SDT,
			exp: data.ExpDate,
			IdTinh: data.IdTinh,
		};
		let user = {
			ID_user: accessData.id,
			username: accessData.username,
			fullname: accessData.fullname,
			avata: accessData.avata,
			
			sdt: accessData.sdt,
			email: accessData.email,
			exp: accessData.exp,
			IdTinh: accessData.IdTinh,
		}
		this.setUserData(user)
		// this.setUserData(JSON.stringify(user))
			// .setAccessToken(accessData.accessToken)
			.setUserRoles(accessData.roles);
		// localStorage.setItem('cur_vaitro', accessData.vaitro);
	}



}
