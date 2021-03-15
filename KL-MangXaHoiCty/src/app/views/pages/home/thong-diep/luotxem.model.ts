import { BaseModel } from './../../../../core/_base/crud/models/_base.model';

export class LuotXemModel extends BaseModel {

	// Id_BaiDang: number;
    id_luotxem:number;
		
    id_thongdiep:number;
    id_user:number;
  
  
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_thongdiep=null;
		this.id_thongdiep = null;
	
	
        this.id_user =null;
     
        
	}
}