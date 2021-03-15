import { BaiDangModel } from './Bai-Dang/Model/Bai-dang.model';
import { environment } from './../../../../environments/environment';
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoggedInUser } from './loggedin.user';


const API_baidang = environment.Apiroot;
@Injectable(
 
)

export class HomeServicesService {
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	getlistBaiDang():any {

		return this.http.get<any>(API_baidang+'/getDSBaiDang');
		
		
	}
	GetDSKhenThuong():any {
		return this.http.get<any>(API_baidang+'/GetDSKhenThuong');

	}

InsertBaiDang(item:BaiDangModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API_baidang + '/addBaiDang', item, { headers: httpHeaders });
}


}
