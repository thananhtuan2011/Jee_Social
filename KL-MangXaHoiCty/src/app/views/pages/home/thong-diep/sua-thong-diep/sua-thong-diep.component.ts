
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ThongdiepService } from '../thongdiep.service';
import { ImageModel } from '../../Bai-Dang/Model/Img.model';

@Component({
  selector: 'kt-sua-thong-diep',
  templateUrl: './sua-thong-diep.component.html',
  styleUrls: ['./sua-thong-diep.component.scss']
})
export class SuaThongDiepComponent implements OnInit {

  base64Image: string;
  nameimg:any;
  image: any;
  thongdiep: any = {};
  item:any[]=[];
  id_user:number;
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<SuaThongDiepComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
     private _service:ThongdiepService,
    private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDilog(data = undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
 // debugger
  this._service.update_ThongDiep(this.thongdiep).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDilog(res.data);
    }
  });
  if(this.nameimg!=null ||this.nameimg!=" ")
  {
  
      this.insert_file();
  
  }
}
getCurrentUser() 
{
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
  
        this.changeDetectorRefs.detectChanges();
  
      }
    }

  reader.readAsDataURL(filesAmount);


  

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
 
  
     this._service.File_Updatethongdiep(this.thongdiep.id_thongdiep,hinh).subscribe((res) => {

    });
   
    this.CloseIMG();
  }


  CloseIMG()
  {
    this.image=null;
    this.nameimg=null;
   
  }
  ngOnInit() {
    this.getCurrentUser();
    this.thongdiep = this.data;
  
    this.changeDetectorRefs.detectChanges();
    
  }


}
