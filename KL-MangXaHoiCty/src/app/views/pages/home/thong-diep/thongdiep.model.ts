import { BaseModel } from './../../../../core/_base/crud/models/_base.model';

export class ThongDiepCEOModel extends BaseModel {

	// Id_BaiDang: number;
    id_thongdiep:number;
		
    title:string;
    noidung:string;
  
    create_by:number;
    createdate:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_thongdiep=null;
		this.title = null;
	
	
        this.noidung =null;
        this.create_by=null;
        this.createdate=null;
        
	}
}