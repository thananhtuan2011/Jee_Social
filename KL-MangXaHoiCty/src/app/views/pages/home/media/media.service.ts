import { environment } from './../../../../../environments/environment';
import { HttpUtilsService } from './../../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MediaModel } from '../Bai-Dang/Model/media.model';


const API = environment.Apiroot+'media' ;
@Injectable(
 
)

export class MediaService {


 
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
     

    getlistMedia():any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+'/GetDSMedia',{ headers: httpHeaders });
      
      
    }
    getlistIDMedia():any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+'/GetIDMedia',{ headers: httpHeaders });
      
    }
   UpdateMedia(item:MediaModel):any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+`/updateMedia`,item,{ headers: httpHeaders });
      
      
    }

    getlistMyMedia(id_user:number):any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+`/GetDS_MyMedia?id_usser=${id_user}`,{ headers: httpHeaders });
      
      
    }
    DeleteMedia(id_media:number):any {
     
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.delete<any>(API+`/deleteMedia?id_media=${id_media}`,{ headers: httpHeaders });
      
      
    }
    getlistMyMediaDetail(id_media:number):any {
      //getDSBaiDang?id_user=6
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API+`/GetDetailMedia?_idmedia=${id_media}`,{ headers: httpHeaders });
      
      
    }
}
