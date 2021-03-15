import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class ImageModel extends BaseModel {

   
	// Id_BaiDang: number;
    image: string;
    name:string;
		
    
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		
		this.image = null;
		this.name = '';
		
	}
	}