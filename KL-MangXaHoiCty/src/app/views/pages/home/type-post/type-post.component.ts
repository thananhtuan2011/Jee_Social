
import { BaiDangDataSource } from './../../../../core/auth/_data-sources/baidang.datasource';
import { SharedService } from './../../../../core/auth/_services/sharedata.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatGridTileHeaderCssMatStyler, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../../core/auth/_services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TokenStorage } from '../../../../core/auth/_services/token-storage.service';
import { ThongDiepComponent } from '../thong-diep/thong-diep.component';
import { TinNhanhComponent } from '../Template_LoaiBaiDang/tin-nhanh/tin-nhanh.component';
import { KhenThuongComponent } from '../Template_LoaiBaiDang/khen-thuong/khen-thuong.component';
import { ChaoDonThanhVienMoiComponent } from '../Template_LoaiBaiDang/chao-don-thanh-vien-moi/chao-don-thanh-vien-moi.component';
import { ThongBaoComponent } from '../Template_LoaiBaiDang/thong-bao/thong-bao.component';
import { TinTucNoiBoComponent } from '../Template_LoaiBaiDang/tin-tuc-noi-bo/tin-tuc-noi-bo.component';
import { BaiDangService } from '../Bai-Dang/_Services/bai-dang.service';
import { DeXuatComponent } from '../Template_LoaiBaiDang/de-xuat/de-xuat.component';

@Component({
  selector: 'kt-type-post',
  templateUrl: './type-post.component.html',
  styleUrls: ['./type-post.component.scss'],

})
export class TypePostComponent implements OnInit {
  selected:any;
  listLoaiBai:any[]=[];
  listLoaiBai_Tam:any[]=[];
  Id_baidang:number;
  filtered :any;
id:any;
  constructor(	
  

    private authService:AuthService,
    private tokenSotre:TokenStorage,
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<TypePostComponent>,
    public dialogRef1: MatDialogRef<TinTucNoiBoComponent>,
    private  sharedService: SharedService,
    private changeDetectorRefs: ChangeDetectorRef,
    public _services:BaiDangService ,
    private dataSource:BaiDangDataSource,
   
    // @Inject(MAT_DIALOG_DATA)
    //  public data: DialogData,
  

    
    ) { 
    
    }


      layIdUser(){
       
      this.tokenSotre.getUserData().subscribe(res=>{
        // debugger
        this.id=res.ID_user;
    
      
      

	});
        }
      

    LoadData() {
      // this.layIdUser()
      debugger
      this.authService.getPhanLoaiBaiDang().subscribe(res=>{
        this.listLoaiBai = res.data;
        this.changeDetectorRefs.detectChanges();
        // console.log(res.data);

      })
     }

     
  //  binData()
  //  {
  //    this.sharedService.setData(this.txtemail);
  //    this.sharedService.setDataPass(this.txtpass)
  //  }
     Template_LoaiBaiDang(id_loaibaidang:number)
     {

      //  this.dialogRef.close();
      
      //  debugger
     //  this.sharedService.setId_LoaiBaiDAng(id_loaibaidang);
      // let obj = this.listLoaiBai.find(x => x.Id_LoaiDang ==id_loaibaidang);
      //this.deleteHT1(obj);
      if(id_loaibaidang===1)
      {
        const dialogRef = this.dialog.open(TinTucNoiBoComponent, {
          width: '500px',
          height:'500px',
          position: {
            
          },
          data: {id_loaibaidang}
        }).afterClosed().subscribe(result => {
         
            if(!result)
            {
              // this._BaiDangViewComponent.change();
           this.changeDetectorRefs.detectChanges();
            }
            else
      
            {
              // this._BaiDangViewComponent.change();
              this.changeDetectorRefs.detectChanges();
            }
          
        
    
        
        });
       
      }
      else if(id_loaibaidang===2){
        const dialogRef = this.dialog.open(KhenThuongComponent, {
          width: '600px',
          height:'500px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===3){
        const dialogRef = this.dialog.open(ThongBaoComponent, {
          width: '500px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===4){
        const dialogRef = this.dialog.open(ChaoDonThanhVienMoiComponent, {
          width: '500px',
          height:'500px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===7){
    
        const dialogRef = this.dialog.open(DeXuatComponent, {
          width: '500px',
          height:'500px',
          data: {id_loaibaidang}
        });

      }
      else
      {
        const dialogRef = this.dialog.open(TinNhanhComponent, {
          width: '500px',
          data: {id_loaibaidang}
        });
      }
     }
  ngOnInit() {
    this.LoadData();
  
  }
 

}
