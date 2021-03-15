import { ThongDiepCEOModel } from './../thongdiep.model';
import { ThongbaoService } from './../../Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from './../../Bai-Dang/Model/ThongBao.model';

import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangModel } from './../../Bai-Dang/Model/Bai-dang.model';
import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef } from '@angular/material';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { trim } from 'lodash';
import { ThongdiepService } from '../thongdiep.service';
import { ImageModel } from '../../Bai-Dang/Model/Img.model';


@Component({
  selector: 'kt-create-thongdiep',
  templateUrl: './create-thongdiep.component.html',
  styleUrls: ['./create-thongdiep.component.scss']
})
export class CreateThongdiepComponent implements OnInit {
  base64Image: string;
  nameimg:any;
  image: any;
  item:any[]=[];
  listkt:any[]=[];
  data_user:any;
  congkhai='Công Khai';
  item_user=[];
  tam:string
  user_tam: any[] = [];
  listUser:Observable<any[]>;
  userCtrl=new FormControl();
  noidung:string="";
  id_user:number;
  tieude:string="";
  listTD:any[]=[];
  id_group = new FormControl('');

  public groupFilterCtrl: FormControl = new FormControl();

list_group:any[]=[];
	
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    public dialogRef: MatDialogRef<CreateThongdiepComponent>,
    // private bdservices:BaiDangService,
    // private _authservice:AuthService,
 
    // private _dbservices:BaiDangService,
    private _services:ThongdiepService,
    private tokenStore:TokenStorage,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,

    private _service_thongdiep:ThongdiepService
  ) {

   
   }

   
 Item_thongdiep(): ThongDiepCEOModel {
 
 const item = new ThongDiepCEOModel();

  
  
       item.title=this.tieude;
       item.noidung=this.noidung;
      item.create_by=this.id_user;
  
  this.changeDetectorRefs.detectChanges();
  return item;
}


// test(){
// 	this.datainput.push({ data:""});
// 	console.log('Data',this.datainput)
// }

// Bắt đầu phần comment

AddThongdiep(item:ThongDiepCEOModel,withBack:boolean){

    this._service_thongdiep.InsertThongDiep(item).subscribe(res=>{
      if (res && res.status === 1) {
       
       
        // this.dialogRef.close();
       
        
           }
           else {
             this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
           }
    })
}

      ThongdieptInsert()
      {

        let it_td=this.Item_thongdiep();
         this.AddThongdiep(it_td,false);
      
        
      }

 

  submit()
  {
    // debugger
  
    // this.ThongBaotInsert();
    // this.reload.loadDataList();
    // this._BaiDangViewComponent.change();
    this.ThongdieptInsert();
    if(this.nameimg!=null ||this.nameimg!=" ")
    {
    
        this.insert_file();
    
    }

    this.dialogRef.close();
   
    this.changeDetectorRefs.detectChanges();

  }

  loadListThongDiep()
  {
    this._services.getDSThongDiep().subscribe(res=>{
      this.listTD=res.data;
            
		this.changeDetectorRefs.detectChanges();
    })
  }

  closeDilog()
  {
    this.dialogRef.close();
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
   
    
       this._services.postWithFile_ThongDiep(hinh).subscribe((res) => {

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
  
  }

}
