import { CommentModel } from './../Model/comment.model';
import { HttpUtilsService } from './../../../../../core/_base/crud/utils/http-utils.service';
import { QueryParamsModel } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, of, observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// const API = environment.Apiroot + '/comment';

const API = environment.Apiroot +'Comment';

@Injectable()
export class CommentService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	getDSComment(Id:any,kk:any): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		// let p = new QueryParamsModel({ object_type: Loai, object_id: Id });
		// let params = this.httpUtils.getFindHTTPParams(p);
		const url = API +`/getDSCOmment?id_baidang=${Id}`;
		return this.http.get<any>(url, {
			headers: httpHeaders,
			// params: params
		});
  }
  
  InsertComnent(item:CommentModel):Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API + '/addComment', item, { headers: httpHeaders });
  }
  InsertComment_Child(item:CommentModel): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<any>(API + '/addComment_chill', item, { headers: httpHeaders });
  }

DeleteComnent(id_cmt:number):Observable<any>{
    const httpHeaders = this.httpUtils.getHTTPHeaders();
	return this.http.delete<any>(API + `/deleteComment?id_cmt=${id_cmt}`,
	{ headers: httpHeaders });
  }



  update_comment(item): Observable<any> {
	  
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	const url = API + '/UpdateComment';
	return this.http.post<any>(url, item, { headers: httpHeaders });
}


update_comment_child(item): Observable<any> {
	
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	const url = API + '/UpdateCommentChild';
	return this.http.post<any>(url, item, { headers: httpHeaders });
}



TagName(id:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	const url = API + `/TagName?id_user=${id}`;
	return this.http.get<any>(url, { headers: httpHeaders });
}


like_cmt(id:number, type:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	//const url = API_baidang + '/like?id=' + id + '&type=' + type;
	const url = API + `/Comment_like?id=${id}&type=${type}`;

	return this.http.post<any>(url,null,{ headers: httpHeaders });
}


like_cmt_child(id:number, type:number): Observable<any> {
	const httpHeaders = this.httpUtils.getHTTPHeaders();
	//const url = API_baidang + '/like?id=' + id + '&type=' + type;
	const url = API + `/CommentChild_like?id=${id}&type=${type}`;

	return this.http.post<any>(url,null,{ headers: httpHeaders });
}

  

	// getDSYKienInsert(item): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const url = API + '/Insert';
	// 	return this.http.post<any>(url, item, { headers: httpHeaders });
	// }
	// update(item): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const url = API + '/Update';
	// 	return this.http.post<any>(url, item, { headers: httpHeaders });
	// }
	// like(id, type = 1): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const url = API + '/like?id=' + id + '&type=' + type;
	// 	return this.http.get<any>(url, { headers: httpHeaders });
	// }
	// remove(id): Observable<any> {
	// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
	// 	const url = API + '/Delete?id=' + id;
	// 	return this.http.get<any>(url, { headers: httpHeaders });
	// }



}
