import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class MediaModel extends BaseModel {

 
	// Id_BaiDang: number;
    ID_media:number;
		
    createdby:number;
    template:string;
    hinhanh	:string;
    base64:string;
    title:string;
    createdate:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.ID_media=null;
		this.title = null;
        this.template=null;
		this.hinhanh = null;
        this.title =null;
        this.createdby=null;
       
        
	}
}