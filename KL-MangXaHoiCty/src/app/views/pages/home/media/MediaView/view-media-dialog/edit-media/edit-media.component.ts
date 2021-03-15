import { MediaModel } from './../../../../Bai-Dang/Model/media.model';
import { AuthService } from './../../../../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MediaService } from '../../../media.service';

@Component({
  selector: 'kt-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.scss']
})
export class EditMediaComponent implements OnInit {

  media: any = {};
  item:any[]=[];
  listTT_user:any[]=[];
  id_user:number;
  image: any;
  base64Image: string=null;
  nameimg:any=null;
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<EditMediaComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:MediaService,
    private auth:AuthService,

    private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDilog(data = undefined)
{
    this.dialogRef.close(data);
}

Item_media(): MediaModel {
		 
  const item = new MediaModel();
          item.ID_media=this.media.id_media;
        item.title=this.media.title;
        item.hinhanh=this.nameimg;
        item.base64=this.base64Image;
this.changeDetectorRefs.detectChanges();

return item;


}
Submit() {
 // debugger
 let item=this.Item_media();
  this._service.UpdateMedia(item).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDilog(res.data);
    }
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
getCurrentUser() 
{
  this.tokenStore.getUserData().subscribe(res =>{
   
      this.item= res;
      this.id_user=res.ID_user;
 

  });
}

loadTTuser()
{
  this.auth.getProFileUsers_change().subscribe(res =>{	

    this.listTT_user=res.data;
    this.changeDetectorRefs.detectChanges();
  
  })
}
  ngOnInit() {
    this.getCurrentUser();
      this.loadTTuser();
    this.media = this.data;
    this.changeDetectorRefs.detectChanges();
    
  }


}
