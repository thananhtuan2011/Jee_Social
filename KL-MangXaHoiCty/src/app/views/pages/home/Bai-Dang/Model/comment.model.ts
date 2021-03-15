import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class CommentModel extends BaseModel {
	// Id_BaiDang: number;
			id_cmt:number;
			ID_BaiDang:number;
			NoiDung_cmt:string;
			id_cmt_parent:number
			typepost:number;
			CreatedDate:Date;
			CreatedBy:number;
			UpdatedDate:Date;
			UpdatedBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_cmt=0;
		this.ID_BaiDang = 0;
		this.NoiDung_cmt = '';
		this.id_cmt_parent =0;
		this.typepost = 0;
        this.CreatedBy =0;
        this.UpdatedBy =0;
	}
}