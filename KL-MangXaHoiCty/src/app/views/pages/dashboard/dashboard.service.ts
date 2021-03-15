import { QueryResultsModel } from './../../../core/_base/crud/models/query-models/query-results.model';
import { environment } from './../../../../environments/environment';
import { QueryParamsModel, QueryParamsModelNew } from './../../../core/_base/crud/models/query-models/query-params.model';
import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TKUser } from './crearte_user.model';


const API = environment.Apiroot ;
@Injectable(
  
)
export class DashboardService {

  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

    lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
    ReadOnlyControl: boolean;
    getListLuuTruKhenThuong():any{
    
      const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+'/GetLuuTruKhenThuongUser';
          return this.http.get<any>(url, { headers: httpHeaders });
        }
        

        findData_User(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API + '/getDSUser_Data';
          return this.http.get<QueryResultsModel>(url, {
            headers: httpHeaders,
            params: httpParams
          });
        }

        findData_BaiDang(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API + '/Baidang_Datasource';
          return this.http.get<QueryResultsModel>(url, {
            headers: httpHeaders,
            params: httpParams
          });
        }

        
        findData_ThanhVien(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API + '/USer_Quanly_Datasource';
          return this.http.get<QueryResultsModel>(url, {
            headers: httpHeaders,
            params: httpParams
          });
        }

        CreateUser_TK(item:TKUser): Observable<any> 
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+'/GetCreateUser';
          return this.http.post<any>(url,item, { headers: httpHeaders });
        }
        GetNV_CreateUser():any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+'/GetNVNotUser';
          return this.http.get<any>(url, { headers: httpHeaders });
        }

        DeleteBaidang(id_bd:number):any{
          const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.delete<any>(API + `/deleteBaiDang?id_baidang=${id_bd}`, 
        { headers: httpHeaders });
        }

        DeleteUser(id__user:number):any{
          const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.delete<any>(API + `/DeleteUser?id_user=${id__user}`, 
        { headers: httpHeaders });
        }

        LoadQuyenHienTai(id_user:number):any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/PhanQuyenLoaiBaiDang?id_user=${id_user}`;
          return this.http.get<any>(url, { headers: httpHeaders });
        }
        
        LoadUpdateQuyen(id_user:number):any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/GetUpdateQuyenLoaiBaiDang?id_user=${id_user}`;
          return this.http.get<any>(url, { headers: httpHeaders });
        }

        UpdateQuyen(id_user:number,id_loai:number):any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/UpdateQuyenLoaiBaiDang?id_user=${id_user}&loai=${id_loai}`;
          return this.http.post<any>(url, { headers: httpHeaders });
        }

        Update_quyenDefault():any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/UpdateQuyenLoaiBaiDang_Default`;
          return this.http.post<any>(url, { headers: httpHeaders });
        }

        DeleteQuyen(id_user:number,id_loai:number):any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/DeleteQuyenLoaiBaiDang?id_user=${id_user}&loai=${id_loai}`;
          return this.http.delete<any>(url, { headers: httpHeaders });
        }

        Create_TrangCaNhan():any
        {
          const httpHeaders = this.httpUtils.getHTTPHeaders();
          const url = API+`/Create_TrangCanNhan`;
          return this.http.post<any>(url, { headers: httpHeaders });
        }




        // findData_ThongBao(queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
        //   const httpHeaders = this.httpUtils.getHTTPHeaders();
        //   const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
        //   const url = API + '/getDSBaiDang_ThongBao';
        //   return this.http.get<QueryResultsModel>(url, {
        //     headers: httpHeaders,
        //     params: httpParams
        //   });
        // }
}
