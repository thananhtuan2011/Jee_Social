import { ImageModel } from './../../Bai-Dang/Model/Img.model';
import { UploadfileService } from './../../Bai-Dang/_Services/uploadfile.service';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { TypePostComponent } from './../../type-post/type-post.component';
import { BaiDangDataSource } from './../../../../../core/auth/_data-sources/baidang.datasource';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { BaiDangModel } from './../../Bai-Dang/Model/Bai-dang.model';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
import { FormControl } from '@angular/forms';
import { ThongbaoService } from '../../Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from '../../Bai-Dang/Model/ThongBao.model';

@Component({
  selector: 'kt-de-xuat',
  templateUrl: './de-xuat.component.html',
  styleUrls: ['./de-xuat.component.scss']
})
export class DeXuatComponent implements OnInit {
  item:any[]=[];
  lastUpdated: string;
  Time:Date;
  id_loai_bai_dang:string;
  htmlContent:string='';
  id:number;
  id_user:number;
  congkhai='Công Khai';
  tieude:string;
  id_loaibaidang:number;
  dulieu = new FormControl('');
  noidung:string='';
  selected:number;
  tam:string
  list_group:any[]=[];
  base64Image: string;
  nameimg:any;
  image: any;
  id_group = new FormControl('');
  public groupFilterCtrl: FormControl = new FormControl();
  constructor(
    private dialogRef:MatDialogRef<DeXuatComponent>,
    private _dbservices:BaiDangService,
    private tokenStore:TokenStorage,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
     private dataSource:BaiDangDataSource,
    public _services:BaiDangService ,
    private _service_gr:GroupService,
    private _service_thongbao:ThongbaoService,
    private _service_file:UploadfileService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
     
      
         this._dbservices.postWithFile(hinh).subscribe((res) => {

			  });
      }



  Item_thongbao(): ThongBaoModel {
    const item = new ThongBaoModel();
  
      
         item.title="Đã tạo một đề xuất:"+this.tieude;
        item.create_tb_by=this.id_user;
    
    this.changeDetectorRefs.detectChanges();
    return item;
  }
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  AddThongbao(item:ThongBaoModel,withBack:boolean){
  
      this._service_thongbao.InsertThongBao(item).subscribe(res=>{
        if (res && res.status === 1) {
         
         
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
        ThongBaotInsert()
        {
  
          let it_cmt=this.Item_thongbao();
           this.AddThongbao(it_cmt,false);
        
          
        }
  LoadData() {
    // debugger
    this.tokenStore.getUserData().subscribe(res =>{
      this.item= res;
      this.id_user=res.ID_user;
    });
   
  }
// binData()
// {
// 	this.sharedService.setData(this.txtemail);
// 	this.sharedService.setDataPass(this.txtpass)
// }


closeDilog()
{
  this.dialogRef.close();
}



f_convertDate(p_Val: any) {
  let a = p_Val === "" ? new Date() : new Date(p_Val);
  return ("0" + (a.getDate())).slice(-2) + "/" + ("0" + (a.getMonth() + 1)).slice(-2) + "/" + a.getFullYear();
}


ItemBaiDang(): BaiDangModel {
  //  debugger


  //const controls = this.itemForm.controls;
  
  const item = new BaiDangModel();
  
    // Users: Array<BaiDangUser> = [];	// user.ID_User = this.item.ID_User;
      
        item.id_loaibaidang=this.id_loaibaidang;
        item.title=this.tieude;
        item.NoiDung=this.noidung;
        item.typepost='';
        item.Id_Group=this.id_group.value;
        // item.CreatedDate=myDate;
      //  item.CreatedBy=this.id_user;
       
        // item.UpdateDate=null;
       // item.UpdateBy=null
      
  this.changeDetectorRefs.detectChanges();
  return item;
}

AddBaiDang(item: BaiDangModel, withBack: boolean) {
  // this.loadingAfterSubmit = true;
  if(this.id_group.value=="Công Khai"||this.id_group.value==0)
  {
  this._dbservices.InsertBaiDang(item).subscribe(res => {
    if (res && res.status === 1) {
     this.dialogRef.close();
    //  this.dataSource.loadListBaiDang();
   
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}
else

{
  this._dbservices.InsertBaiDang(item).subscribe(res => {
    if (res && res.status === 1) {
     this.dialogRef.close();
    //  this.dataSource.loadListBaiDang();
   
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}
}




submit()
{
  // debugger
  let ItemBd=this.ItemBaiDang();
  this.AddBaiDang(ItemBd,false);
  // this.reload.loadDataList();
 // this.ThongBaotInsert();
  // this._BaiDangViewComponent.change();
  if(this.nameimg!=null ||this.nameimg!=" ")
  {
    this.insert_file();
  }
  this.dialogRef.close();
  this.changeDetectorRefs.detectChanges();

}

 getCurrentTime(){
  return moment().format('DD/MM/YYYY HH:mm:ss'); 
}


LoadListGroup(){
  this._service_gr.getlistgroup().subscribe(res =>{
        this.list_group=res.data;
  })
}


getDataShare(){
 this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)

 this.selected=Number(this.tam);

}
 

  ngOnInit() {
    this.getDataShare();
    this.LoadData();
   
    this.LoadListGroup();
    this.id_loaibaidang=this.data.id_loaibaidang;
    this.groupFilterCtrl.setValue('');
  }
}

