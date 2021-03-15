import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { UploadfileService } from './../../Bai-Dang/_Services/uploadfile.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MediaService } from '../media.service';
import { ImageModel } from '../../Bai-Dang/Model/Img.model';
import { MediaComponent } from '../media.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-media-tinvanban',
  templateUrl: './media-tinvanban.component.html',
  styleUrls: ['./media-tinvanban.component.scss']
})
export class MediaTinvanbanComponent implements OnInit {
	_color: string = 'bg10';
  item:any[]=[];
  id_user:number;
  listTT_user:any[]=[];
  ListMedia:any[]=[];
  noidung:string="";
  image: any;
  base64Image: string;
  nameimg:any;
  constructor(
    private dialogRef:MatDialogRef<MediaTinvanbanComponent>,
    private dialogRefAll:MatDialogRef<MediaComponent>,
    private authService:AuthService,
    private tokenStore:TokenStorage,
    private _services_media:MediaService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service_file:UploadfileService,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
  ) { }
	public defaultColors: string[] = [
		'bg1',
		'bg2',
		'bg3',
		'bg4',
		'bg5',
		'bg6',
		'bg7',
		'bg8',
		'bg9',
		'bg10',
	];

  closeDilog()
  {
    this.dialogRef.close();
  }


  CloseAll()

  {
    this.dialogRefAll.close();
  }

  
getCurrentUser() {
  
  this.tokenStore.getUserData().subscribe(res =>{
    this.item= res;
    this.id_user=res.ID_user;

    
  });
}
loadTTuser()
  {
    this.authService.getProFileUsers_change().subscribe(res =>{	

      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
     
    })
  }

  Selected_Color(event): any {
		this._color = event.value;
		// this.item.color = event;
		this._color = event;
  }
  
  LoadMedia()
{
		this._services_media.getlistMedia().subscribe(res=>{
			this.ListMedia=res.Data;
			this.changeDetectorRefs.detectChanges();
			
		})
}

Item_media(): ImageModel {
		 
  const item = new ImageModel();
  if(this.base64Image==""||this.base64Image==null)
  {
    item.image=null;
  }
  else{
    item.image=this.base64Image;
  }
 

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
InsertMedia()
{
  let item=this.Item_media();
  this._service_file.postMedia(item,this.noidung,this._color,this.id_user).subscribe((res) => {
    this.changeDetectorRefs.detectChanges();
      });
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
    
      // base64Str = event.target["result"]
        // // var metaIdx = base64Str.indexOf(';base64,');
        // base64Str = base64Str.substr(metaIdx + 8); // Cắt meta data khỏi chuỗi base64

        // //this.FileAttachStrBase64 = base64Str;
    
        // 	this.AttachFileComment.push({ filename: filesAmount.name, strBase64: base64Str });
          this.changeDetectorRefs.detectChanges();
    
        }
      }

      reader.readAsDataURL(filesAmount);

    }
   

Submit()
{
  this.InsertMedia();
  this. closeDilog();

  const _messageType = this.translate.instant('Đăng tin thành công !');
  this.layoutUtilsService.showActionNotification(_messageType, MessageType.Update, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
  });
}

  ngOnInit() {
    this.getCurrentUser();

    this.loadTTuser();
    this.LoadMedia();
  }

}
