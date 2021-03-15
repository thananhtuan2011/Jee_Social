import { QueryResultsModel } from './../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModel, QueryParamsModelNew } from './../../../core/_base/crud/models/query-models/query-params.model';
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const API_Thongbao = environment.Apiroot+'thongbao';

const API = environment.Apiroot;
@Injectable(
  
)
export class LuutruService {

  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

    lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
    ReadOnlyControl: boolean;
    getListLuuTruKhenThuong():any{
    
      const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+'/GetLuuTruKhenThuongUser';
          return this.http.get<any>(url, { headers: httpHeaders });
        }
        

        findData_TinTucNoiBo(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API + '/getDSBaiDang_TinTucNoiBo';
          return this.http.get<QueryResultsModel>(url, {
            headers: httpHeaders,
            params: httpParams
          });
        }

        getListGhim(id_user:number):any{
    
          const httpHeaders = this.httpUtils.getHTTPHeaders();
              const url = API+`/getDSGhim?id_user=${id_user}`;
              return this.http.get<any>(url, { headers: httpHeaders });
            }
            
    
        
        findData_ThongBao(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API_Thongbao + '/getDSBaiDang_ThongBao';
          return this.http.get<QueryResultsModel>(url, {
            headers: httpHeaders,
            params: httpParams
          });
        }
}
