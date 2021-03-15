import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';


export class BaiDangModel extends BaseModel {
	Id_BaiDang: number;
	id_loaibaidang: number;
	Id_Group:number;
	title: string;
	NoiDung: string;
	typepost: string;
	CreatedDate:Date;
	CreatedBy: number;
     id_khenthuong: number;
    UpdateDate:Date;
    UpdateBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_khenthuong=0;
		this.Id_Group=0;
		this.UpdateDate=undefined;
		this.UpdateBy=0;
		// this.id_row = 0;
		// this.title = '';
		// this.description = '';
		// this.id_project_team = '';
		// this.email = '';
	}
}
export class BaiDangUser extends BaseModel {
    ID_User: number;
    ID_NV:number;
    username: string;
    password: string;
    email: string;
    accessToken: string;
    // refreshToken: string;
    roles: number[];
    pic: string;
    // fullname: string;
	TinhTrang: boolean;
	
	// companyName: string;
	
    // socialNetworks: SocialNetworks;

    clear(): void {
        this.ID_User = undefined;
        this.username ='';
        this.password = '';
        this.email = '';
        this.roles = [];
        // this.fullname = '';
        this.accessToken = 'access-token-' + Math.random();
        // this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.TinhTrang =false;
        
        // this.socialNetworks = new SocialNetworks();
        // this.socialNetworks.clear();
    }
}


export class FileUploadModel extends BaseModel {
	IdRow: number;
	strBase64: string;
	filename: string;
	src: string;
	IsAdd: boolean;
	IsDel: boolean;
	IsImagePresent: boolean;
	clear() {
		this.IdRow = 0;
		this.strBase64 = '';
		this.filename = '';
		this.src = '';
		this.IsAdd = false;
		this.IsDel = false;
		this.IsImagePresent = false;
	}
}
