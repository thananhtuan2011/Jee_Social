import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from './../../../core/_base/crud/models/query-models/query-params.model';
import { environment } from './../../../../environments/environment';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileModel } from './Model_profile/myprofile.model';
import { UserProfileModel } from './Model_profile/user_Ac.model';

const API= environment.Apiroot+'user';



@Injectable(
 
)
export class ProfileService {



  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	Update_NV(Id_u:number,id_nv:number,item:ProfileModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// let p = new QueryParamsModel({ object_type: Loai, object_id: Id });
		// let params = this.httpUtils.getFindHTTPParams(p);
		const url = API +`/UpdateUserProfile_NV?id_user=${Id_u}&id_nv=${id_nv}`;
		return this.http.post<any>(url,item, {
			headers: httpHeaders,
			// params: params
		});
  }


  Update_User(Id_u:number,id_nv:number,item:UserProfileModel): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// let p = new QueryParamsModel({ object_type: Loai, object_id: Id });
		// let params = this.httpUtils.getFindHTTPParams(p);
		const url = API +`/UpdateUserProfile_User?id_user=${Id_u}&id_nv=${id_nv}`;
		return this.http.post<any>(url,item, {
			headers: httpHeaders,
			// params: params
		});
  }

  ChangePass(Id_u:number,pass:string): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// let p = new QueryParamsModel({ object_type: Loai, object_id: Id });
	// let params = this.httpUtils.getFindHTTPParams(p);
	const url = API +`/UpdatePass?id_user=${Id_u}&pass=${pass}`;
	return this.http.post<any>(url, {
		headers: httpHeaders
		// params: params
	});
}

    
  getNV():any {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	//getDSBaiDang?id_user=6
	return this.http.get<any>(API+`/GetUserProfile`, {headers: httpHeaders});
  }

//   GetUserProfile(id_user:number):any {
// 	//getDSBaiDang?id_user=6
// 	return this.http.get<any>(API+`/GetUserProfile?id_user=${id_user}`);
//   }
	
  
}
