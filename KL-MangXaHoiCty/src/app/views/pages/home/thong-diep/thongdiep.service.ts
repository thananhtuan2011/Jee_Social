import { HttpUtilsService } from './../../../../core/_base/crud/utils/http-utils.service';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThongDiepCEOModel } from './thongdiep.model';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
import { LuotXemModel } from './luotxem.model';

const API = environment.Apiroot+'thongdiep' ;
@Injectable(

)
export class ThongdiepService {

  
  
  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService) { }
    
    postWithFile_ThongDiep(_item: ImageModel): Observable<boolean> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+'/File_ThongDiep', _item,{ headers: httpHeaders });
        
  }


  File_Updatethongdiep(id_:number,_item: ImageModel): Observable<boolean> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API+`/File_Updatethongdiep?id_thongdiep=${id_}`, _item,{ headers: httpHeaders });
      
}
    getDSThongDiep(): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + '/getDSThongDiep', { headers: httpHeaders });
    }

    CheckGhim(): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/CheckGhim`, { headers: httpHeaders });
    }

    getDSThongDiepDetail(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSThongDiepDetail?id_td=${id_}`, { headers: httpHeaders });
    }
    getrandomDSThongDiep(): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + '/getRanDomDSThongDiep', { headers: httpHeaders });
    }
  
    getrandomDSLuotXem(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSLuotXem?id_thongdiep=${id_}`, { headers: httpHeaders });
    }

   CountLuotXem(id_:number): any {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      return this.http.get<any>(API + `/CountLuotXem?id_thongdiep=${id_}`, { headers: httpHeaders });
    }
   
    
    update_Ghim(id_user:number,id_thongdiep:number): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const url = API + `/UpdateGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`;
      return this.http.post<any>(url, { headers: httpHeaders });
    }
    update_ThongDiep(item): Observable<any> {
      const httpHeaders = this.httpUtils.getHTTPHeaders();
      const url = API + '/UpdateThongDiep';
      return this.http.post<any>(url, item, { headers: httpHeaders });
    }
InsertThongDiep(item:ThongDiepCEOModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + '/addThongDiep', item, { headers: httpHeaders });
}

Insertluotxem(item:LuotXemModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.post<any>(API + '/addLuotXem', item, { headers: httpHeaders });
}

InsertGhim(id_user:number,id_thongdiep:number): Observable<any> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API + `/addGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
}

DeleteThongDiep(id_td:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API + `/DeleteThongDiep?id_thongdiep=${id_td}`, { headers: httpHeaders });
}

addGhim(id_user:number,id_thongdiep:number): Observable<any> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API + `/addTBLGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
}

DeleteGhim(id_user:number,id_thongdiep:number): Observable<any> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.delete<any>(API + `/DeleteGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
}


}
