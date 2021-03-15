import { MatDialog } from '@angular/material/dialog';
import { MychatService } from './../../MyChat/mychat.service';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';

import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/auth/_services/auth.service'
// import { AuthService } from 'src/app/core/auth/_services/auth.service';

import { Observable, of, interval } from 'rxjs'
import { tap, debounce, switchMap, startWith, map } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import { SharedService } from './../../../../core/auth/_services/sharedata.service';
import { Router } from '@angular/router';
import { NumberFormatStyle } from '@angular/common';
import { ChatCaNhanService } from './chat-ca-nhan-service/chat-ca-nhan.service';
import { SignalrService } from '../signalr.service';
import { MessageChat } from './Model-chat/chat-model.model';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
import { EditMessComponent } from '../../MyChat/edit-mess/edit-mess.component';
import { DeletechatComponent } from '../../MyChat/deletechat/deletechat.component';
import { DeleteChatUserComponent } from './delete-chat-user/delete-chat-user.component';
import { EditChatUserComponent } from './edit-chat-user/edit-chat-user.component';

@Component({
  selector: 'kt-tool-user-right',
  templateUrl: './tool-user-right.component.html',
  styleUrls: ['./tool-user-right.component.scss']
})
export class ToolUserRightComponent implements OnInit {
  constructor(private authservice: AuthService,
    private changeDetectorRefs: ChangeDetectorRef,
    private tokenStore:TokenStorage,
	private _signalRService: SignalrService,
	private sharedService:SharedService,
	private dialog:MatDialog,
    // private _dataService: DataService,
	private _ngZone: NgZone,
	private router:Router,
		private service_chat:ChatCaNhanService,
		private layoutUtilsService:LayoutUtilsService,
		private _service_file:MychatService,
	
    
    ) {
	  this.subscribeToEvents();
	   this.subscribeToEventsMessenger();
			// this can check for conenction exist or not. 
			this.canSendMessage = _signalRService.connectionExists;
	 }
	// ngAfterViewChecked(): void {
	// 	console.log(this.s.nativeElement); // throws an error
	// }
	 
	 scrollTop = 200;
	
	
	
	@ViewChild('scroll', { static: true }) public scroll: ElementRef<any>;
	 isShowForm=false;
	 isShowForm2=false;
	 isShowForm3=false;
	 id_user_chat1:number;
	 id_user_chat2:number;
	 id_user_chat3:number;
  Test: any[];
  item:any[]=[];
  list_messenger:any[]=[];
  list_messenger2:any[]=[];
  list_messenger3:any[]=[];
  itemuser: any[] = [];
  id_send:number =0;
  id_nhan:number=0;
  id_nhan2:number=0;
  id_nhan3:number=0;
  AttachFileComment: any[] = [];
  base64Image: string;
  nameimg:any;
  image: any;
  id_user_current:number;
  listTT_user:any[]=[];
  listTT_user_receive:any[]=[];

  @ViewChild('matInput', { static: true }) matInput: ElementRef;

  listUser:Observable<any[]>;
 userControl =new FormControl();
  id_user_:number;
  isLoading = false;
  result_list: any;
  id_user_chat:number;
  list_chat:any[]=[];
  public canSendMessage: Boolean;
  user_chat1:any[]=[];
  user_chat2:any[]=[];
  user_chat3:any[]=[];
noidung:string="";

  private subscribeToEvents(): void {

		
		// this.listthongbao = [];
	
		// if connection exists it can call of method.  
		this._signalRService.connectionEstablished.subscribe(() => {
		  this.canSendMessage = true;
		});
	
		// finally our service method to call when response received from s
		// erver event and transfer response to some variable to be shwon on the browser.  
		this._signalRService.CheckOnline.subscribe((announcement: any) => {
		  this._ngZone.run(() => {

			// console.log('List thông báo:',this.listthongbao );
			
		
        this.itemuser = announcement;
        
    	  this.loadTT();
     
        

		  });
		});
	  }


	  private subscribeToEventsMessenger(): void {
		
		this.list_messenger = [];
	
		// if connection exists it can call of method.  
		this._signalRService.connectionEstablished.subscribe(() => {
		  this.canSendMessage = true;
		});
	
		// finally our service method to call when response received from s
		// erver event and transfer response to some variable to be shwon on the browser.  
		this._signalRService.ReceivedMessenger.subscribe((announcement: any) => {
		  this._ngZone.run(() => {

			// console.log('List thông báo:',this.listthongbao );
			
			 this.list_messenger.push(announcement[0]);
        // this.list_messenger = announcement;
        console.log('List messenger signlar',this.list_messenger );
        this.loadMess();
     
        

		  });
		});
	  }
  
	
	//duyet cac phan tu
	private _normalizeValue(value: string): string {
		return value.toLowerCase().replace(/\s/g, '');
	}

	private _filterStates(value: string): any[] {
		// debugger
		//	const filterValue = value.toLowerCase();
		const filterValue = this._normalizeValue(value);
		return this.itemuser.filter(state => this._normalizeValue(state.Username).includes(filterValue));
  }

//   public scrollBottom() {
// 	setTimeout(() => {
		
// 	  console.log(this.scroll.nativeElement.scrollTop);
// 	this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
// 	}, 2000);


 // }
//   ngAfterViewInit() {
//     console.log(this.scroll.nativeElement); // throws an error
// }
  Item_Mess(): MessageChat {
    const item = new MessageChat();
  
      
         item.message=this.noidung;
        item.userid_send=this.id_user_current;
			item.userid_nhan=this.id_nhan;
			item.disable=0;
  
    return item;
  }
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  AddMesss(item:MessageChat,withBack:boolean){
  
      this.service_chat.Send(item).subscribe(res=>{
        if (res && res.status === 1) {
         
		
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
     
  SendMessage()
	  {
		let it_mes=this.Item_Mess();
		
		

	
			this.AddMesss(it_mes,false);
			this.noidung="";
			if(this.nameimg!=null ||this.nameimg!=" ")
			{
				
			  this.insert_file();
			  this.image=null;
			  this.nameimg=null;
			}
		
		setTimeout(() => {
			this.loadMess();
		}, 100);
		
	  }

  loadMess()
  {
	  this.service_chat.GetListMessenger(this.id_user_current,this.id_nhan).subscribe((res:any)=>{
		  this.list_messenger=res.data;
		//   console.log('listmess:',this.list_messenger);
		//   this.announcements = [];
		  this.changeDetectorRefs.detectChanges();
  
	  })
  }
  loadMess2()
  {
	  this.service_chat.GetListMessenger(this.id_user_current,this.id_nhan2).subscribe((res:any)=>{
		  this.list_messenger2=res.data;
		  console.log('listmess:',this.list_messenger);
		//   this.announcements = [];
		  this.changeDetectorRefs.detectChanges();
  
	  })
  }
  loadMess3()
  {
	  this.service_chat.GetListMessenger(this.id_user_current,this.id_nhan3).subscribe((res:any)=>{
		  this.list_messenger3=res.data;
		  console.log('listmess:',this.list_messenger);
		//   this.announcements = [];
		  this.changeDetectorRefs.detectChanges();
  
	  })
  }



 
	GetUserChat1()
	{
		this.service_chat.GetUserChat(this.id_user_chat1).subscribe(res=>{
			this.user_chat1=res.data;
			
			this.changeDetectorRefs.detectChanges();
		})
	}

	GetUserChat2()
	{
		this.service_chat.GetUserChat(this.id_user_chat2).subscribe(res=>{
			this.user_chat2=res.data;
			
			this.changeDetectorRefs.detectChanges();
		})
	}

	GetUserChat3()
	{
		this.service_chat.GetUserChat(this.id_user_chat3).subscribe(res=>{
			this.user_chat3=res.data;
			
			this.changeDetectorRefs.detectChanges();
		})
	}

	close()
	{ 
	
		this.isShowForm=false;
		const index = this.list_chat.indexOf(this.list_chat[0]);
		if (index >= 0) {
			this.list_chat.splice(index, 1);
		  }
		  
		this.changeDetectorRefs.detectChanges();
	}
	
	close2()
	{
		this.isShowForm2=false;
		const index = this.list_chat.indexOf(this.list_chat[1]);
		if (index >= 0) {
			this.list_chat.splice(index, 1);
		  }
		this.changeDetectorRefs.detectChanges();
	}

	close3()
	{
		this.isShowForm3=false;
		const index = this.list_chat.indexOf(this.list_chat[2]);
		if (index >= 0) {
			this.list_chat.splice(index, 1);
		  }
		this.changeDetectorRefs.detectChanges();
	}
 
  
  ShowOrHideComment(ind: number,vi:number) {
	 

		//   this.list_chat.push(ind);
		 
		  
				var x =document.getElementById("chatbox"+vi);
				this.isShowForm=true;
				// console.log('id_user',ind);
				// console.log('vi',vi)
				this.id_user_chat1=ind;
				this.id_nhan=this.id_user_chat1;
				this.GetUserChat1();
				this.changeDetectorRefs.detectChanges();
				this.loadMess();
				this.loadTTUserNhan();
				
		
	}
	getCurrentUser() 
	{
	  this.tokenStore.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.ID_user;
	 
  
	  });
	}

	loadTTuser()
	{
	  this.authservice.getProFileUsers_change().subscribe(res =>{	
	
		this.listTT_user=res.data;
		this.changeDetectorRefs.detectChanges();
	  
	  })
	}

	loadTTUserNhan()
	{
		// this.authservice.getProFileUsers_change(this.id_nhan).subscribe(res =>{	
	
		// 	this.listTT_user_receive=res.Data;
		// 	this.changeDetectorRefs.detectChanges();
		  
		//   })
	}

	loadTT()
	{
		this.authservice.getAllUsers().subscribe(res => {
			//  console.log(res);
			this.itemuser = res.data;
			
		
				this.listUser= this.userControl.valueChanges
				.pipe(
				  startWith(''),
				  map(state => state ? this._filterStates(state) : this.itemuser.slice())
				
				);
			
				this.changeDetectorRefs.detectChanges();
	  
		  })
	
   


	}
	onSelectFile_PDF(event) {
		setTimeout(() => {
			
		if (event.target.files && event.target.files[0]) {
   
			var filesAmount = event.target.files[0];
			var Strfilename = filesAmount.name.split('.');
		  
		  
		
		  
			var reader = new FileReader();
		
			//this.FileAttachName = filesAmount.name;
			let base64Str: any;
			reader.onload = (event) => {
		
			  this.image=reader.result;
			this.base64Image = ''+event.target["result"];
			this.nameimg=filesAmount.name;
			this.base64Image = this.base64Image.split(',')[1];
		  
				this.changeDetectorRefs.detectChanges();
		  
			  }
			}
		
		  reader.readAsDataURL(filesAmount);
		}, 100);
		
		 } 
		 
		 CloseIMG()
		 {
		   this.image=null;
		   this.nameimg=null;
		 
		 }
	  
  ngOnInit() {
    
	this.isShowForm=false;
	this.isShowForm2=false;
	this.isShowForm3=false;
	//search
	
	this.getCurrentUser();
this.loadTT();
	



  }
  
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  // set = 'twitter';
  set = 'facebook';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.noidung)
    const { noidung } = this;
    console.log(noidung);
    console.log(`${event.emoji.native}`)
    const text = `${noidung}${event.emoji.native}`;

	this.noidung = text;

    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }
  
    Item_hinh(): ImageModel {
     
      const item = new ImageModel();
    

           item.image=this.base64Image;
           if(this.nameimg==="")
           {
            item.name=null;
           }
           else

           {
            item.name=this.nameimg;
           }
          
      
      this.changeDetectorRefs.detectChanges();
      return item;
    }
		
		
		  
	insert_file()
    {
    
      let hinh=this.Item_hinh();
   
    
       this._service_file.postWithFile_mess(hinh).subscribe((res) => {

	  });
	  this.loadMess();
	}

	Create_Delete(id_mess:number) {
   
		var data = Object.assign({}, id_mess);
		// var data = Object.assign({}, item);
		const dialogRef = this.dialog.open(DeleteChatUserComponent, { data:id_mess,
		  
		  width: '500px',
		  height: '150px'
		 });
		dialogRef.afterClosed().subscribe(res => {
		  if (res) {
			id_mess = res.chat
			this.loadMess();
			this.changeDetectorRefs.detectChanges();
		  }
		  else
		  {
			this.loadMess();
			this.changeDetectorRefs.detectChanges();
		  }
		});
	  }
	
	
	
	
	
	Create_Edit(item,index,indexc=-1) {
		var data = Object.assign({}, item);
		// var data = Object.assign({}, item);
		const dialogRef = this.dialog.open(EditChatUserComponent, { data:item,
		  
		  width: '500px',
		  height: '150px'
		 });
		dialogRef.afterClosed().subscribe(res => {
		  if (res) {
			item.chat = res.chat
			this.loadMess();
			this.changeDetectorRefs.detectChanges();
		  }
		  else
		  {
			this.loadMess();
			this.changeDetectorRefs.detectChanges();
		  }
		});
	  }

}
