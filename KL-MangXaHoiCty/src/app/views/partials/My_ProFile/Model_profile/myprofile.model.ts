import { BaseModel } from './../../../../core/_base/crud/models/_base.model';



export class ProfileModel extends BaseModel {

	// Id_BaiDang: number;
    id_nv:number;
		
    diachi:string;
    sdt:string;
    gioitinh	:string;
    ngaysinh:string;
   
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_nv=null;
		this.diachi = null;
	
		this.sdt = null;
        this.gioitinh =null;
        this.ngaysinh=null;
        
        
    }
}