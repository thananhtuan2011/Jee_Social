import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangService } from './../_Services/bai-dang.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageModel } from '../Model/Img.model';
import { UploadfileService } from '../_Services/uploadfile.service';


@Component({
  selector: 'kt-tin-nhanh-edit',
  templateUrl: './tin-nhanh-edit.component.html',
  styleUrls: ['./tin-nhanh-edit.component.scss']
})
export class TinNhanhEditComponent implements OnInit {

  tinnhanh: any = {};
  item:any[]=[];
  base64Image: string;
  nameimg:any;
  image: any;
  id_user:number;
  viewLoading:boolean=false;
  listTT_user:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<TinNhanhEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:BaiDangService,
    private tokenStore:TokenStorage,
    private auth:AuthService,
    private _service_file:UploadfileService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDia(data = undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
 // debugger
  this._service.UpdateBaiDang(this.tinnhanh).subscribe(res => {
   
    if (res && res.status == 1) {
    
      this.closeDia(res.data);
      
    }
  });
  this.insert_file();
  this.changeDetectorRefs.detectChanges();
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
 
    
     this._service_file.UpdateWithFile(this.tinnhanh.Id_BaiDang,hinh).subscribe((res) => {
      

    });
    this.changeDetectorRefs.detectChanges();
  }
  ngOnInit() {
    this.getCurrentUser();
    this.loadTTuser();
    this.tinnhanh = this.data;
    console.log('data tin nhanh',this.tinnhanh);
    this.changeDetectorRefs.detectChanges();
    
  }


}
