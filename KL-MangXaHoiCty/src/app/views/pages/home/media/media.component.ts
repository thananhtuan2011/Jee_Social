import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';
import { MediaTinvanbanComponent } from './media-tinvanban/media-tinvanban.component';
import { MediaModel } from './../Bai-Dang/Model/media.model';
import { AuthService } from './../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
import { UploadfileService } from '../Bai-Dang/_Services/uploadfile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {


  image: any;
base64Image: string;
nameimg:any;
  constructor(

		private authService:AuthService,
		private tokenStore:TokenStorage,
    private cdr: ChangeDetectorRef,
    private _service_file:UploadfileService,
    public dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef,
		private dialogRef:MatDialogRef<MediaComponent>,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,

  ) { }

  item:any[]=[];
  listTT_user:any[]=[];
	id_user:number;

	
	DiaClose()
	{
			this.dialogRef.close();
	}
  loadTTuser()
  {
    this.authService.getProFileUsers_change().subscribe(res =>{	

      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
     
    })
  }


getCurrentUser() {
  
  this.tokenStore.getUserData().subscribe(res =>{
    this.item= res;
    this.id_user=res.ID_user;

    
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
					console.log(this.image);
			
						this.cdr.detectChanges();
			
					}
				}
	
				reader.readAsDataURL(filesAmount);
	
			}

	   
		Item_media(): ImageModel {
		 
		 
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
			  
		  
		  this.cdr.detectChanges();
		  
		  return item;
		}
			

      insert_file()
      {
            let hinh=this.Item_media();
                this._service_file.postMedia(hinh,"","",this.id_user).subscribe((res) => {
              this.cdr.detectChanges();
                });
      }
      Submit()
      {
		this.insert_file();
		this.DiaClose();
		const _messageType = this.translate.instant('Đăng tin thành công !');
			this.layoutUtilsService.showActionNotification(_messageType, MessageType.Update, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
			});
	  }
	  
	 



TaoTin_VanBan() {

	// var data = Object.assign({}, item);
	const dialogRef = this.dialog.open(MediaTinvanbanComponent, {
		
		width: '700px' ,
		height: '500px'}
		
	// dialogRef.afterClosed().subscribe(res => {
	// 	if (res) {
	// 		this.DiaClose();
	// 		// const _messageType = this.translate.instant('Đăng tin thành công !');
	// 		// this.layoutUtilsService.showActionNotification(_messageType, MessageType.Update, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
	// 		// });
	// 		// this.loadDataList();
	// 		// this.changeDetectorRefs.detectChanges();
	// 	}
	// 	else
	// 	{
	// 		// this.DiaClose();
	// 		// const _messageType = this.translate.instant('Đăng tin thành công !');
	// 		// this.layoutUtilsService.showActionNotification(_messageType, MessageType.Update, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
	// 		// });
	// 		// this.loadDataList();
	// 			 this.changeDetectorRefs.detectChanges();
		//}
	).afterClosed().subscribe(result => {
         
		if(!result)
		{
			
		  // this._BaiDangViewComponent.change();
	   this.changeDetectorRefs.detectChanges();
		}
		else
  
		{
			this.DiaClose();
		  // this._BaiDangViewComponent.change();
		  this.changeDetectorRefs.detectChanges();
		}
	  
	

	
	});
   
}
			  
	
	

  ngOnInit() {
    this.getCurrentUser();
    this.loadTTuser();
  }

}
