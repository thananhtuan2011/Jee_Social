import { LayoutUtilsService } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { environment } from './../../../../../../environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { QueryParamsModel, QueryResultsModel } from '../../../../../core/_base/crud';

import { map, retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MessageChat } from '../Model-chat/chat-model.model';
// import { AuthenticationService } from 'src/app/core/auth';
const API_ROOT_URL = environment.Apiroot;
declare var ga: Function; // Declare ga as a function
@Injectable(
	
)
export class ChatCaNhanService {

	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;

	constructor(
		private http: HttpClient,
		private httpUtils: HttpUtilsService,
		private layoutUtilsService: LayoutUtilsService
	) { }


	updateContent(item): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ROOT_URL + '/UpdateBeforPublic', item, { headers: httpHeaders });
	}

	GetUserChat(id_:number):any {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API_ROOT_URL + `/GetDSUser_profile_change?id_user=${id_}`, { headers: httpHeaders });
	}

	GetListMessenger(id_send:number,id_user_nhan:number):any
	{
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.get<any>(API_ROOT_URL + `/GetDSMessenger?id_user_send=${id_send}&id_user_revice=${id_user_nhan}`, { headers: httpHeaders });
	
	}

	Send(item:MessageChat): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(API_ROOT_URL + '/addMessenger', item, { headers: httpHeaders });
	}
}
