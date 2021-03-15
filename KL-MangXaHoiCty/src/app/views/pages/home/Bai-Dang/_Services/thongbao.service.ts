import { environment } from './../../../../../../environments/environment';
import { ThongBaoModel } from './../Model/ThongBao.model';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = environment.Apiroot+'thongbao' ;
@Injectable(

)

export class ThongbaoService {

  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }
    



	UpdateThongBao(id_thongbao:number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API + `/UpdateTinhTrangTrueThongBao?id_thongbao=${id_thongbao}`, { headers: httpHeaders });
	}
	
	getCountTB():any {
		//getDSBaiDang?id_user=6
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API+`/Count_ThongBao?iduser`, { headers: httpHeaders });
		
		
	  }
InsertThongBao(item:ThongBaoModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/addThongBao?`, item, { headers: httpHeaders });
}

InsertThongBao_like(id_cmt:number,id_baidang:number,item:ThongBaoModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/addthongbao_like/?id_cmt=${id_cmt}&id_baidang=${id_baidang}`, item, { headers: httpHeaders });
}

    
DeleteThongBao(id_tb:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API + `/deleteThongBao?id_thongbao=${id_tb}`, { headers: httpHeaders });
}

ThongBaoApp()
{
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.get<any>(API + '/BanThongBao', { headers: httpHeaders });
}

DeleteAllThongBao(): Observable<any> 
{

	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + `/UpdateTinhTrangTrueAllThongBao`, { headers: httpHeaders });
}

}

