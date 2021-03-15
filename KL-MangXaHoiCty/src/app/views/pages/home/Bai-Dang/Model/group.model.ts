import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class GroupModel extends BaseModel {

   
	// Id_BaiDang: number;
             id_group:number;
		
			ten_group:string;
		
			avatar_group:string;
			CreatedDate:Date;
			CreatedBy:number;
			UpdatedDate:Date;
			UpdatedBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_group=0;
		this.ten_group = null;
	
		this.avatar_group = null;
        this.CreatedBy =0;
        this.UpdatedBy =0;
	}
}