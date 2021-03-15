import { UserProfileModel } from './../../../../partials/My_ProFile/Model_profile/user_Ac.model';
import { environment } from './../../../../../../environments/environment';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageModel } from '../Model/Img.model';
import { MediaModel } from '../Model/media.model';

const API = environment.Apiroot ;
@Injectable(
 
)
export class UploadfileService {
  public responseData: any;
  constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }



    postAvatar(_item: ImageModel): Observable<boolean> {
  

      const httpHeaders=this.httpUtils.getHTTPHeaders();
      return this.http.post<any>(API+'trangcanhan'+`/UpdateAvatarUser`,_item,{ headers: httpHeaders });
        
    }

postWithFile_Comment(_item: ImageModel): Observable<boolean> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API+'/File_Comment', _item,{ headers: httpHeaders });
    
}

UpdateWithFile(id_:number,_item: ImageModel): Observable<boolean> {
  const httpHeaders = this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API+`/File_Updatebaidang?id_baidang=${id_}`, _item,{ headers: httpHeaders });
    
}



postMedia(_item: ImageModel,tideude:string,temp:string,id_user:number): Observable<boolean> {
  

  const httpHeaders=this.httpUtils.getHTTPHeaders();
  return this.http.post<any>(API+`/addMedia?tieude=${tideude}&template=${temp}&id_user=${id_user}`,_item,{ headers: httpHeaders });
    
}

}

