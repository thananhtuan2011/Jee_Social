import { QueryResultsModel } from './../../../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModel, QueryParamsModelNew } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { environment } from './../../../../../../environments/environment';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GroupModel } from '../Model/group.model';
import { UserGroupModel } from '../../Group/group_user.model';


const API = environment.Apiroot+'group' ;
const API_GroupMember = environment.Apiroot+'GroupMember';
@Injectable(

)
export class GroupService {

  
  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

    subject = new Subject<any>()

    sendClickEvent(){
			this.subject.next();
		  }
		  getClickEvent():Observable<any>{
			return this.subject.asObservable();
		 }
    getlistgroup():any {
      //getDSBaiDang?id_user=6
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+`/getDSGroup`,{ headers: httpHeaders });
      
      
    }
        
    getAllUsser_filter_Group(id_gr:number,filter: any): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
  let params = this.httpUtils.parseFilter(filter);
  return this.http.get<any>(API_GroupMember + `/GetDSUser_filter_InGroup?id_gr=${id_gr}`, { headers: httpHeaders, params: params });
  }
   


  getAllChooseUsser_In_Group(id_g:number,filter: any): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
  let params = this.httpUtils.parseFilter(filter);
  return this.http.get<any>(API_GroupMember + `/GetDSUser_In_Group?id_group=${id_g}`, { headers: httpHeaders, params: params });
  }
    getlist_Usergroup(id_:number):any {
      //getDSBaiDang?id_user=6
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+`/getDSUser_Group?id_group=${id_}`,{ headers: httpHeaders });
      
      
    }
    UpdateGroup(item:GroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + '/UpdateGroup', item, { headers: httpHeaders });
    }

  

    InsertGroup(item:GroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + '/addGroup', item, { headers: httpHeaders });
    }
    DeleteGroup(id_group:number):Observable<any>{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API + `/deleteGroup?id_group=${id_group}`,
    { headers: httpHeaders });
    }


    InsertUserGroup(id_group:number,id_user:number,item:UserGroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API_GroupMember + `/addUserGroup?id_group=${id_group}&id_user=${id_user}`, item, { headers: httpHeaders });
    }

    getList_User(id:number,queryParams: QueryParamsModelNew): Observable<QueryResultsModel>{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
          const url = API_GroupMember+`/DataSource_Group?id_group=${id}`;
          return this.http.get<any>(url, { headers: httpHeaders,
            params: httpParams });
        }
  

    Update_quyen_Memmber(id_user:number,item:UserGroupModel): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API_GroupMember + `/Update_quyen_Memmber?id_user=${id_user}`, item, { headers: httpHeaders });
    }

    Delete_User_Group(id_gr:number,id_u:number): Observable<any> {
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			return this.http.delete<any>(API_GroupMember + `/Delete_User?id_group=${id_gr}&id_user=${id_u}`, { headers: httpHeaders });
		}
	

  
    DeleteBaidang(id_bd:number):any{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API + `/deleteBaiDang?id_baidang=${id_bd}`, 
    { headers: httpHeaders });
    }
  
    findData_BaiDangGroup(id_group:number,queryParams: QueryParamsModelNew): Observable<QueryResultsModel> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
      const url = API + `/BaidangGroup_Datasource?id_group=${id_group}`;
      return this.http.get<QueryResultsModel>(url, {
        headers: httpHeaders,
        params: httpParams
      });
    }

  
}
