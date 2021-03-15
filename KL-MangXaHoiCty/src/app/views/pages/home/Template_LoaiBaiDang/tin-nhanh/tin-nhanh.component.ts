import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { UploadfileService } from './../../Bai-Dang/_Services/uploadfile.service';
import { ThongbaoService } from './../../Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from './../../Bai-Dang/Model/ThongBao.model';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { BaiDangModel } from './../../Bai-Dang/Model/Bai-dang.model';
import { BaiDangService } from './../../Bai-Dang/_Services/bai-dang.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { TokenStorage } from '../../../../../core/auth/_services/token-storage.service';
import { FormControl } from '@angular/forms';
import { ImageModel } from '../../Bai-Dang/Model/Img.model';
@Component({
  selector: 'kt-tin-nhanh',
  templateUrl: './tin-nhanh.component.html',
  styleUrls: ['./tin-nhanh.component.scss']
})
export class TinNhanhComponent implements OnInit {

  
  public groupFilterCtrl: FormControl = new FormControl();
  constructor(private tokenStore:TokenStorage,
    
    private dialogRef:MatDialogRef<TinNhanhComponent>,
    private _dbservices:BaiDangService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    private  sharedService: SharedService,
    private _service_gr:GroupService,
    private _service_thongbao:ThongbaoService,
    private _service_file:UploadfileService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    listTT_user:any[]=[];
    list_group:any[]=[];
  tin:string='';
  tam:string
  item:any[]=[];
  id_loaibaidang:number;
  congkhai='Công Khai';
  isDisabled = true;
  selected:number;
  id_user:number;
  id_loai_bai_dang:string;
  tieude:string;
  id:number
  id_group = new FormControl('');
  image: any;
  images:any[]=[];
  filesAmount: File = null;
  imgURL:any;
  AttachFileComment: any[] = [];
  base64Image: string;
  nameimg:any;
  Item_thongbao(): ThongBaoModel {
    const item = new ThongBaoModel();
  
      
         item.title="Tạo một tin nhanh :"+this.tin;
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
 
  LoadUser() {
    // debugger
    this.tokenStore.getUserData().subscribe(res =>{
      this.item= res;
    });
  }
  getCurrentUser() 
  {
    this.tokenStore.getUserData().subscribe(res =>{
     
        this.item= res;
        this.id_user=res.ID_user;
   

    });
  }
  ThongBaoForApp()
  {
    this._service_thongbao.ThongBaoApp();

   
  
  }
  getData(){
    // debugger
    this.sharedService.ID.subscribe(sharedata => this.id_loai_bai_dang = sharedata)

   
  }


  item_baidang():BaiDangModel
  {
    const item = new BaiDangModel();
    debugger
      
        
        item.id_loaibaidang=this.id_loaibaidang;
        item.title=this.tin;
         item.NoiDung='';
         item.typepost='';
         item.Id_Group=this.id_group.value;
        // item.CreatedDate=myDate;
        //item.CreatedBy=this.id_user;
       /// item.id_group=null;
        // item.UpdateDate=null;
        //item.UpdateBy=null
      
  this.changeDetectorRefs.detectChanges();
  return item;
  }

  addTinNhanh(item:BaiDangModel, withBack: boolean)
  {
    if(this.id_group.value=="Công Khai"||this.id_group.value==0)
    {
    this._dbservices.InsertBaiDang(item).subscribe(res => {
			if (res && res.status === 1) {
       this.dialogRef.close();
      //  this.dataSource.loadListBaiDang();
     
    //  this.ThongBaotInsert();
//this.ThongBaoForApp();
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
     //  this.ThongBaotInsert();
      // this.ThongBaoForApp();
      //  this.dataSource.loadListBaiDang();
     
        
			}
			else {
				this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			}
    });
  }
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
     
      
         this._dbservices.postWithFile(hinh).subscribe((res) => {

			  });
      }

  submit()
  {
    let item=this.item_baidang();
      this.addTinNhanh(item,false);
      this.changeDetectorRefs.detectChanges();

      if(this.nameimg!=null ||this.nameimg!=" ")
      {
        this.insert_file();
      }
     
   


  }

  
  closeDilog()
  {
    this.dialogRef.close();
  }

  flip() {
    // debugger
    if(this.tin!="")
    this.isDisabled = !this.isDisabled;
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
   
  loadTTuser()
  {
    this.auth.getProFileUsers_change().subscribe(res =>{	
  
      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
    
    })
  }

  ngOnInit() {
    this.getDataShare();
    this.getCurrentUser();
    this.loadTTuser();
    this.LoadUser();
   
this.id_loaibaidang=this.data.id_loaibaidang;
    this.LoadListGroup();
    this.groupFilterCtrl.setValue('');
    
    
  }

}
