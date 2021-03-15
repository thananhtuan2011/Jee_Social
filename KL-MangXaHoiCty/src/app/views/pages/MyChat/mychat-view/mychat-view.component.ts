import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';
import { ChatCaNhanService } from './../../home/tool-user-right/chat-ca-nhan-service/chat-ca-nhan.service';
import { AuthService } from './../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, Input, NgZone, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MychatService } from '../mychat.service';
import { MessageChat } from '../../home/tool-user-right/Model-chat/chat-model.model';
import { SignalrService } from '../../home/signalr.service';
import { MatDialog } from '@angular/material';
import { DeletechatComponent } from '../deletechat/deletechat.component';
import { EditMessComponent } from '../edit-mess/edit-mess.component';
import { ImageModel } from '../../home/Bai-Dang/Model/Img.model';
import { UploadfileService } from '../../home/Bai-Dang/_Services/uploadfile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-mychat-view',
  templateUrl: './mychat-view.component.html',
  styleUrls: ['./mychat-view.component.scss']
})
export class MychatViewComponent implements OnInit,AfterViewChecked  {
  @Input() id_cr: any;
  item:any[]=[];
  base64Image: string;
  nameimg:any;
  image: any;
  check=false;
  id_user_current:number;
  listmessage:any[]=[];
  listTT_user_receive:any[]=[];
  noidung:string="";
  public canSendMessage: Boolean;
  list_messenger:any[]=[];
  private scrollContainer: any;
  scrolltrang:boolean=true;
  @HostListener("window:scroll", [])
  onWindowScroll() {
   window.scrollTo(0,0);
  }
  @ViewChild('scroll', { static: true }) public scroll: ElementRef<any>;
  // @ViewChild("scrollMe") scrollMe: ElementRef;
  scrollTop = 200;
  constructor(
    private _service_file:MychatService,
    private route:ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private services:MychatService,
    private tokenStore:TokenStorage,
    private authservice: AuthService,
    private service_chat:ChatCaNhanService,
    private layoutUtilsService:LayoutUtilsService,
    private _signalRService: SignalrService,
    private _ngZone: NgZone,
    private dialog:MatDialog,
    private renderer: Renderer2,
    private translate: TranslateService,
 
  ) {

   
    this.subscribeToEventsMessenger();
     // this can check for conenction exist or not. 
     this.canSendMessage = _signalRService.connectionExists;
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
            // this.loadMess();
            this.scrollBottom();
            // this.loadMess();
            this.changeDetectorRefs.detectChanges();
            
    
          });
        });
        }
        loadMess()
        {
          this.service_chat.GetListMessenger(this.id_user_current,this.id_cr).subscribe((res:any)=>{
            this.list_messenger=res.data;
          //   console.log('listmess:',this.list_messenger);
          //   this.announcements = [];
            this.changeDetectorRefs.detectChanges();
        
          })
        }
  
  Item_Mess(): MessageChat {
    const item = new MessageChat();
  
      
         item.message=this.noidung;
        item.userid_send=this.id_user_current;
        item.type="";
    item.userid_nhan=this.id_cr;
  
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
      this.Open();
      this.noidung='';
      if(this.nameimg!=null ||this.nameimg!=" ")
      {
      
          this.insert_file();
      
      }
  
     
      
	
		// this.AddMesss(it_mes,false);
	  }


    public scrollBottom() {
      setTimeout(() => {
     
        console.log(this.scroll.nativeElement.scrollTop);
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
      }, 100);
      
  
    }
    
  ngAfterViewChecked() {
 setTimeout(() => {
   
  if(this.scrolltrang==true)
  {
    this.scrollBottom()
  }
 
 }, 100);
  
   
 }

  getCurrentUser() 
	{
	  this.tokenStore.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.ID_user;
	 
  
	  });
  }
  loadTTUserNhan()
	{
		this.authservice.getProFileUsers_change().subscribe(res =>{	
	
			this.listTT_user_receive=res.data;
			this.changeDetectorRefs.detectChanges();
		  
		  })
	}

  LoadlistData()
  {
        this.services.GetListMessenger(this.id_user_current,this.id_cr).subscribe(res=>{
          this.listmessage=res.data;
          this.changeDetectorRefs.detectChanges();
        })
  }
  DeleteMess(id_mess:number)
  {
    this.services.deleteMess(this.id_user_current,id_mess).subscribe(res=>{
      this.loadMess();
    })
  }
Scrolltr()
{
  this.scrolltrang=false;
  this.changeDetectorRefs.detectChanges();
}
  Create_Delete(id_mess:number) {
   
    var data = Object.assign({}, id_mess);
    // var data = Object.assign({}, item);
    const dialogRef = this.dialog.open(DeletechatComponent, { data:id_mess,
      
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
    const dialogRef = this.dialog.open(EditMessComponent, { data:item,
      
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



  ngOnInit() {
   
  




    this.route.params.subscribe(params => {
    
      this.id_cr =+params.id_cr;
      console.log('id_cr:',this.id_cr);
 
    // this.GetCurrentUser();

    this.getCurrentUser();
   this.LoadlistData();
   this.loadTTUserNhan();
      this.loadMess();
   
    
    
    });
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

 
 Open = function () {
   
  const interaction = document.querySelector('.c-interaction');
  const toggleButton = document.querySelector('.c-interaction__toggle')
  
    interaction.classList.toggle('c-interaction__options')

}

onSelectFile_PDF(event) {
 
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
  

      this.Open();
  

  } 
   Item_hinh():ImageModel {
     
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
     
      this.CloseIMG();
    }


    CloseIMG()
    {
      this.image=null;
      this.nameimg=null;
      this.Open();
    }
creaFormDelete()
		{
			const _title = this.translate.instant('Xóa cuộc trò chuyện');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
	
	
		

				this.services.deleteAllMess(this.id_user_current,this.id_cr).subscribe(res => {
          window.location.reload();
					// this.loadMess();

						
					this.layoutUtilsService.OffWaitingDiv();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				
					
				});
			});
		 }

}




