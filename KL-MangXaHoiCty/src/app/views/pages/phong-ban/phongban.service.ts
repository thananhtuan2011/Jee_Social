import { environment } from './../../../../environments/environment';
import { QueryResultsModel } from './../../../core/_base/crud/models/query-models/query-results.model';
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel, QueryParamsModelNew } from './../../../core/_base/crud/models/query-models/query-params.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const API = environment.Apiroot;
@Injectable(
 
)
export class PhongbanService {

  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }


  
	getList(id:number,queryParams: QueryParamsModelNew): Observable<QueryResultsModel>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
        const url = API+`/Get_DSNhanVien_Dashboard?id_phong=${id}`;
        return this.http.get<any>(url, { headers: httpHeaders,
          params: httpParams });
      }

      
	findData(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API + '/List';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params: httpParams
		});
	}
}
