import { BaseModel } from './../../../../core/_base/crud/models/_base.model';


export class UserGroupModel extends BaseModel {

   
	// Id_BaiDang: number;
    Id_Group:number;
		
    id_user:number;
		
    quyen_group:boolean;
    CreateDate:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.Id_Group=0;
		this.id_user = 0;
	
		this.quyen_group = null;
        this.CreateDate =null;
      
	}
}