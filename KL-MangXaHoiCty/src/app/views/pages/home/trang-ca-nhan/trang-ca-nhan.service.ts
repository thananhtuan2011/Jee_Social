import { QueryResultsModel } from './../../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModelNewLazy } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { HttpUtilsService } from './../../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
import { Observable } from 'rxjs';
import { TrangCaNhanModel } from './TrangCaNhan.model';
const API = environment.Apiroot+'trangcanhan';
// const API_Flow = environment.Apiroot+'flow';
@Injectable(
  
)
export class TrangCaNhanService {


  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }



   
    getdataEdit(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/GetDataEDit?id_baidang=${id_}`, { headers: httpHeaders });
    }
    gettrangCaNhan(): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getTrangCaNhan`, { headers: httpHeaders });
    }
    getBaiDangTrangCaNhan(queryParams: QueryParamsModelNewLazy): Observable<QueryResultsModel>{
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
      
      return this.http.get<any>(API + `/getDSBaiDangTrangCaNhan`, { headers: httpHeaders,params:  httpParams });
    }

    getGioiThieu(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getGioiThieu?id_user=${id_}`, { headers: httpHeaders });
    }
    getRanDomAnh(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getRanDoomAnh?id_user=${id_}`, { headers: httpHeaders });
    }
  
      ChangeAnhBia(id_:number,_item: ImageModel): Observable<boolean> {
        const httpHeaders = this.httpUtils.getHTTPHeaders();
        return this.http.post<any>(API+`/UpdateAnhBia?id_canhan=${id_}`, _item,{ headers: httpHeaders });
    }

    ChiaSeBaiDang(id_user:number,id_bd:number): Observable<boolean> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+`/ShareBaiDang?id_user=${id_user}&id_baidang=${id_bd}`,{ headers: httpHeaders });
      
  }

  DeleteBaiDangCaNhan(id_:number,): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.delete<any>(API+`/deleteBaiDangChiaSe?id_baidangcanhan=${id_}`,{ headers: httpHeaders });
}

UpdateTieuSu(item:TrangCaNhanModel): Observable<any> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
}

postAvatar(_item: ImageModel): Observable<boolean> {
  

  const httpHeaders=this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API+`/UpdateAvatarUser`,_item,{ headers: httpHeaders });
    
}
}
