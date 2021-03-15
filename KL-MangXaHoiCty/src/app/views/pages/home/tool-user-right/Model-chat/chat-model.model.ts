import { BaseModel } from './../../../../../core/_base/crud/models/_base.model';
export class MessageChat extends BaseModel {
    idchat: number;
      message: string;
    userid_send: number;
    userid_nhan: number;
    disable:number
    type:string;
      clear() {
        this.idchat = 0;
        this.message = '';
          this.userid_send = 0;
          this.userid_nhan = 0;
          this.disable=0;
          this.type='';
        
    }
    constructor() {
        super();
        this.idchat = 0;
        this.message = '';
        this.userid_nhan = 0;
        this.userid_nhan = 0;
        this.disable=0;
        this.type='';
    }
}
  
export class MessageResChat extends BaseModel {
    idchat: number;
    message: string;
    userid: number;
    time: string;
    username: string;
    avatar: string;
    isme: boolean;

    // constructor() {
    //     super();
    //     this.idchat = 0;
    //     this.message = '';
    //     this.time = '';
    //     this.username = '';
    //     this.avatar = '';
    //     this.isme = false;
    //     this.userid = 0;
    // }
}
export class SubmitDirectChat extends BaseModel {
    type: string;
    position: string;
    data: any;

    constructor() {super();
        this.type = '';
        this.position = '';
        this.data = null;
    }

}

export class RequestLeaveGroupModel extends BaseModel {
    IdGroup : number;
    IsDelGroup : boolean;
    UserIdLeave:number;
    IsHuy:boolean;
    clear() {
           this.IdGroup=0;
           this.IsDelGroup=false;
           this.UserIdLeave=0;
           this.IsHuy=false;
    }

}
export class ChatGroupModel extends BaseModel {
    IdGroup : number;
    FriendId:number;
    IsGroup: boolean;
    GroupName:string;
    clear() {
           this.IdGroup=0;
           this.IsGroup=false;
           this.FriendId=0;
           this.GroupName="";
    }

}
export class NotifyChatModel extends BaseModel {
    IdGroup : number;
    UserID:number;
    IsGroup: boolean;
    IsNotify:boolean;
    clear() {
           this.IdGroup=0;
           this.IsGroup=false;
           this.UserID=0;
           this.IsNotify=false;
    }
}
export class Chat_CommentModel
{
     IdChat: number;

     IdGroup: number;

    UserID: number;
    FullName: string;

    

     Comment: string;

     PathFile: string;

     IsDelAll: Boolean;

     IsHidenAll: Boolean;

     TypeFile: number;

     TenFile: string;

     IsVideoFile: Boolean;
     IsGroup: Boolean;


     CreatedDate: Date;

     IdChatReplay: number;

    IconChat: number;
    FileUpload: any;
    ComentParent: any;
    SendKey: string;
    PathIcon: string = '';
    CreatedDateString: string = '';
    IsChatMe: boolean = false;
    avata: string = '';
    clear() {
        this.IdChat=0;
        this.IdGroup = 0;
        this.IdChatReplay = 0;
        this.IconChat = 0;
        this.FileUpload=null;
        this.Comment = '';
        this.ComentParent = null;
        this.SendKey = '';
        
    }
    
    constructor() {
       //// super(); 
     this.IdChat= 0;

     this.IdGroup= 0;

     this.UserID= 0;

     this.Comment= "";

     this.PathFile= "";

     this.IsDelAll= false;

     this.IsHidenAll= false;

     this.TypeFile= 0;

     this.TenFile= "";

     this.IsVideoFile= false;

     this.CreatedDate= new Date();

     this.IdChatReplay= 0;

        this.IconChat = 0;
        this.FullName = '';
        this.FileUpload = null;
        this.IsGroup = false;
        this.ComentParent=null;
        this.SendKey = '';
}


}
export class ChatCmtsRequestModel extends BaseModel {
    IdGroup: number;
    IdChatFrom: number;
    SizeChat: number;
      clear() {
        this.IdChatFrom = 0;
        this.IdGroup = 0;
        this.SizeChat = 0;  
    }
    constructor() {
        super();
        this.IdChatFrom = 0;
        this.IdGroup = 0;
        this.SizeChat = 0;
    }
}
  
export class PageChatModel {
	Page: number;
	AllPage: number;
	Size: number;
    Total: number;
    constructor() 
    {
        this.Page = 0;
        this.AllPage = 0;
        this.Size = 10;
        this.Total = 0;
    }
    setNewValue(_page:number,_size:number,_allpage:number=0,_total :number=0 ){
        this.Page =_page;
        this.AllPage = _allpage;
        this.Size = _size;
        this.Total = _total;
    }
}

