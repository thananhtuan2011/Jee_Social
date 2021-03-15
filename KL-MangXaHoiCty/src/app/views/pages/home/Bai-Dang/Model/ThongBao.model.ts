import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class ThongBaoModel extends BaseModel {

   
	// Id_BaiDang: number;
    id_thongbao:number;
		
    title:string;
    id_bd:number;
    id_cmt	:number;
    create_tb_by:number;
    timetb:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_thongbao=null;
		this.title = null;
	
		this.id_cmt = null;
        this.id_bd =null;
        this.create_tb_by=null;
        this.timetb=null;
        
	}
}