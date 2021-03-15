import { HttpUtilsService } from './../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// const API= environment.Apiroot+'trangcanhan'
const API= environment.Apiroot+'flow'
const API_canhan= environment.Apiroot+'trangcanhan'
@Injectable(
 
)
export class FlowCaNhanService {

 
  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }
 
    
    CheckFlow(id_canhan:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/CheckFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
    }


    InsertFlow(id_canhan:number): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API + `/addFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
    }

    
    DeleteFlow(id_canhan:number): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.delete<any>(API + `/DeleteFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
    }
    
    getFlow(id_canhan:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
    }
     
    getdataEdit(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/GetDataEDit?id_baidang=${id_}`, { headers: httpHeaders });
    }
    getTrangCaNhanFlow(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getTrangCaNhanFlow?id_user=${id_}`, { headers: httpHeaders });
    }
    getBaiDangFlowTrangCaNhan(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSBaiDangFlowTrangCaNhan?id_user=${id_}`, { headers: httpHeaders });
    }

    getGioiThieuFlow(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getGioiThieuFlow?id_user=${id_}`, { headers: httpHeaders });
    }
    getRanDomAnh(): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API_canhan + `/getRanDoomAnh`, { headers: httpHeaders });
    }
  
   
    ChiaSeBaiDang(id_user:number,id_bd:number): Observable<boolean> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+`/ShareBaiDang?id_user=${id_user}&id_baidang=${id_bd}`,{ headers: httpHeaders });
      
  }

  DeleteBaiDangCaNhan(id_:number,): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API+`/deleteBaiDangChiaSe?id_baidangcanhan=${id_}`,{ headers: httpHeaders });
}

// UpdateTieuSu(item:TrangCaNhanModel): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.post<any>(API + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
// }
}
