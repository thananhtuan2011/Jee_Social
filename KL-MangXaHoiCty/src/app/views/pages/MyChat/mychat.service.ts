import { environment } from './../../../../environments/environment';
import { LayoutUtilsService } from './../../../core/_base/crud/utils/layout-utils.service';
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from './../../../core/_base/crud/models/query-models/query-params.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageChat } from '../home/tool-user-right/Model-chat/chat-model.model';
import { ImageModel } from '../home/Bai-Dang/Model/Img.model';

const API_ROOT_URL = environment.Apiroot;
@Injectable(
 
)
export class MychatService {


  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;

	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		private layoutUtilsService: LayoutUtilsService
	) { }

	GetListMessenger(id_send:number,id_user_nhan:number):any
	{
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API_ROOT_URL + `/GetDSMessenger?id_user_send=${id_send}&id_user_revice=${id_user_nhan}`, { headers: httpHeaders });
	
  }

  postWithFile_mess(_item: ImageModel): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API_ROOT_URL+'/File_UpdateMess', _item,{ headers: httpHeaders });
      
}
  Updatechat(item): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API_ROOT_URL+`/UpdateMessenger`,item,{ headers: httpHeaders });
    
    
  }
  deleteAllMess(id_curennt:number,id_nhan:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API_ROOT_URL + `/DeleteAllMessenger?id_user_send=${id_curennt}&id_user_nhan=${id_nhan}`, { headers: httpHeaders });
}
  deleteForeverMess(id_mess:number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.delete<any>(API_ROOT_URL + `/DeleteForeverMessenger?id_mess=${id_mess}`, { headers: httpHeaders });
	}
	updateContent(item): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ROOT_URL + '/UpdateBeforPublic', item, { headers: httpHeaders });
	}
	deleteMess(id_cr:number,id_mess:number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ROOT_URL + `/DeleteMessenger?id_user_cr=${id_cr}&id_mess=${id_mess}`, { headers: httpHeaders });
	}
	GetListUserChat(id_:number):any {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API_ROOT_URL + `/GetUserNhanMessenger?id_user_send=${id_}`, { headers: httpHeaders });
	}

}
