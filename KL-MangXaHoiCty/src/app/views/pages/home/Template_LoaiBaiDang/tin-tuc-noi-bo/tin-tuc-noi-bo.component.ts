import { ThongbaoService } from './../../Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from './../../Bai-Dang/Model/ThongBao.model';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { TypePostComponent } from './../../type-post/type-post.component';
import { BaiDangDataSource } from './../../../../../core/auth/_data-sources/baidang.datasource';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { BaiDangModel } from './../../Bai-Dang/Model/Bai-dang.model';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ChangeDetectorRef, Input, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
import { FormControl } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-tin-tuc-noi-bo',
  templateUrl: './tin-tuc-noi-bo.component.html',
  styleUrls: ['./tin-tuc-noi-bo.component.scss'],
 
})
export class TinTucNoiBoComponent implements OnInit {

  list_group:any[]=[];
  item:any[]=[];
  tam:string;
  lastUpdated: string;
  Time:Date;
  id_loaibaidang:number;
  htmlContent:string='';
  id:number;
  id_user:number;
  tieude:string;
  dulieu = new FormControl('');
  id_group = new FormControl('');
  congkhai='Công Khai';
  editor = ClassicEditor;
  dl: any = `Tesst`;
  selected:number;
  public groupFilterCtrl: FormControl = new FormControl();
  constructor(   private dialogRef:MatDialogRef<TinTucNoiBoComponent>,
    private dialogRef_all:MatDialogRef<TypePostComponent>,
    private _dbservices:BaiDangService,
    private tokenStore:TokenStorage,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
     private dataSource:BaiDangDataSource,
    public _services:BaiDangService ,
    private _service_gr:GroupService,
    private route:ActivatedRoute,
    private _service_thongbao:ThongbaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {   this.lastUpdated = this.getCurrentTime();}


    
        // get id user
    LoadData() {
      // debugger
      this.tokenStore.getUserData().subscribe(res =>{
        this.item= res;
        this.id_user=res.ID_user;
      });
     
    }
    Item_thongbao(): ThongBaoModel {
      const item = new ThongBaoModel();
    
        
           item.title=this.tieude;
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
        
      var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
        // let myDate=new Date(this.lastUpdated);
        let dateString =this.lastUpdated;
          let myDate=new Date('');
        
          item.id_loaibaidang=this.id_loaibaidang;
          item.title=this.tieude;
          item.NoiDung=plainText;
          item.Id_Group=this.id_group.value;
          item.typepost='';
          // item.CreatedDate=myDate;
         // item.CreatedBy=this.id_user;
        
          // item.UpdateDate=null;
       
        
		this.changeDetectorRefs.detectChanges();
		return item;
	}

  AddBaiDang(item: BaiDangModel, withBack: boolean) {
    // this.loadingAfterSubmit = true;
    // debugger
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

    // this.ThongBaotInsert();
    // this.reload.loadDataList();
    // this._BaiDangViewComponent.change();
    this.dialogRef_all.close();
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
    this.id_loaibaidang=this.data.id_loaibaidang;

    this.getDataShare();
    this.LoadData();
    
    this.LoadListGroup();
    this.groupFilterCtrl.setValue('');

    
   // console.log(this.id_loai_bai_dang);
   
  }









  ttconfig: AngularEditorConfig = {
  
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Nhập Nội Dung...',
    translate: 'no',
   
 
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}
