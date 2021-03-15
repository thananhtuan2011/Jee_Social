import { BaseModel } from './../../../../core/_base/crud/models/_base.model';



export class UserProfileModel extends BaseModel {

	// Id_BaiDang: number;
    id_user:number;
		
    username:string;
    // sdt:string;
    // gioitinh	:string;
    // ngaysinh:Date;
   
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_user=null;
		this.username = null;
	
		
        
        
    }
}