import { MediaModel } from './../../Bai-Dang/Model/media.model';

import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { UploadfileService } from './../../Bai-Dang/_Services/uploadfile.service';
import { ThongBaoModel } from './../../Bai-Dang/Model/ThongBao.model';
import { ThongbaoService } from './../../Bai-Dang/_Services/thongbao.service';
import { KhenThuongEditComponent } from './../../Bai-Dang/khen-thuong-edit/khen-thuong-edit.component';
import { ChaoDonThanhvienEditComponent } from './../../Bai-Dang/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { TinNhanhEditComponent } from './../../Bai-Dang/tin-nhanh-edit/tin-nhanh-edit.component';
import { CommentEditDialogComponent } from './../../Comment/comment-edit-dialog/comment-edit-dialog.component';
import { CommentService } from './../../Bai-Dang/_Services/comment.service';
import { BaidangEditComponent } from './../../Bai-Dang/baidang-edit/baidang-edit.component';
// import { CommentEditDialogComponent } from './../comment/comment-edit-dialog/comment-edit-dialog.component';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TokenStorage } from '../../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud/utils/layout-utils.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LeavePersonalCBCCModel }from '../../../../../core/auth/_models/typepost.model';
import { TranslateService } from '@ngx-translate/core';
import { TypePostComponent } from '../../type-post/type-post.component';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import { BaiDangModel } from '../../Bai-Dang/Model/Bai-dang.model';
import { CommentModel } from '../../Bai-Dang/Model/comment.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DeXuatEditComponent } from '../../Bai-Dang/de-xuat-edit/de-xuat-edit.component';
import { MediaComponent } from '../../media/media.component';
import { MediaService } from '../../media/media.service';
import { MediaDetailComponent } from '../../media/media-detail/media-detail.component';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, first } from 'rxjs/operators';
import { ImageModel } from '../../Bai-Dang/Model/Img.model';
import { ThongdiepService } from '../thongdiep.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LuotXemModel } from '../luotxem.model';

@Component({
  selector: 'kt-detail-thongdiep',
  templateUrl: './detail-thongdiep.component.html',
  styleUrls: ['./detail-thongdiep.component.scss']
})
export class DetailThongdiepComponent implements OnInit {

  constructor(
	  private service: ThongdiepService,
	  private changeDetectorRefs: ChangeDetectorRef,
    private route:ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,

private tokenStore:TokenStorage,
  ) { }
  
  check:any[]=[];
  count_lx:any[]=[];
  listUserXem:any[]=[];
  @Input() id_thongdiep: any;
  listThongdiep:any[]=[];
  id_user:number;
  checkghim:boolean;
  
  LoadDetailTD()
  {
	this.service.getDSThongDiepDetail(this.id_thongdiep).subscribe(res=>{
		this.listThongdiep=res.data;
		this.changeDetectorRefs.detectChanges();
	})
  }
  Item_luotxem(): LuotXemModel {
 
    const item = new LuotXemModel();
   
     
     
          item.id_thongdiep=this.id_thongdiep;
          item.id_user=this.id_user;
       
     
     this.changeDetectorRefs.detectChanges();
     return item;
   }
   
   
   // test(){
   // 	this.datainput.push({ data:""});
   // 	console.log('Data',this.datainput)
   // }
   
   // Bắt đầu insert lượt xem
   
   Addluotxem(item:LuotXemModel,withBack:boolean){
   
       this.service.Insertluotxem(item).subscribe(res=>{
         if (res && res.status === 1) {
          
          
           // this.dialogRef.close();
          
           
              }
              else {
                // this.layoutUtilsService.showActionNotification(res.error, MessageType.Read, 999999999, true, false, 3000, 'top', );
              }
       })
   }
   
         LuotXemInsert()
         {
   
           let it_lx=this.Item_luotxem();
            this.Addluotxem(it_lx,false);
         
           
         }
   
         GetCurrentUser() {
          // debugger
          this.tokenStore.getUserData().subscribe(res =>{
          //   this.item= res;
            this.id_user=res.ID_user;
          });
           
          }

          getUserLuotXem()
          {
            this.service.getrandomDSLuotXem(this.id_thongdiep).subscribe(res =>{
              this.listUserXem=res.data;
              console.log('LuotXem',this.listUserXem)
              this.changeDetectorRefs.detectChanges();
            })
          }

          getCountLuotXem() {
              this.service.CountLuotXem(this.id_thongdiep).subscribe(res=>{
                this.count_lx=res.data;
                this.changeDetectorRefs.detectChanges();
              })
          }


          addGhim()

          {
            this.service.addGhim(this.id_user,this.id_thongdiep).subscribe(res=>{
            })
          }
          deleteGim()
          {
            this.service.DeleteGhim(this.id_user,this.id_thongdiep).subscribe(res=>{
            })
          }
          
          Ghim()

          {
            this.service.InsertGhim(this.id_user,this.id_thongdiep).subscribe(res=>{
              this.LoadDetailTD();
              this.addGhim();

              //  this.ngOnInit();
              // this.LoadDetailTD();
              // this.ngOnInit();
              // window.location.reload();
              
           
            })
          }
         
          UpdateGhim()

          {
            this.service.update_Ghim(this.id_user,this.id_thongdiep).subscribe(res=>{
              this.LoadDetailTD();
              this.deleteGim();
                // this.LoadDetailTD();
              // this.ngOnInit();
              // window.location.reload();
              
            })
          }
          Test()

          {

          }

          // LoadCheck()
          // {
          //   this.service.CheckGhim().subscribe(res=>{
          //     this.check=res.Data;
          //     console.log('Check',this.check);
          //     this.changeDetectorRefs.detectChanges();
             
          //   })
          // }
        
       
  ngOnInit() {


    this.route.params.subscribe(params => {
		this.id_thongdiep =+params.id_;
	console.log('id_thongdiep',this.id_thongdiep);
		this.changeDetectorRefs.detectChanges();
		
    });
    this.GetCurrentUser();
    this.LoadDetailTD();
    this.LuotXemInsert();
    this.getUserLuotXem();
    this.getCountLuotXem();
   
	// this.LoadCheck();
  }





	


}
