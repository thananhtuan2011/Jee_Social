import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'kt-edit-quyen-user',
  templateUrl: './edit-quyen-user.component.html',
  styleUrls: ['./edit-quyen-user.component.scss']
})
export class EditQuyenUserComponent implements OnInit {
  id: any ;
  // checked=true;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  danhsachquyenDelete:any={};
  danhsachquyenUpdate:any={};
  listquyenht:any[]=[];

  list_updateQuyen:any[]=[];
  constructor(
    private _formBuilder: FormBuilder,
    private services:DashboardService,
    private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public id_user: any
  ) { }


  getCheckboxes() {
    // console.log(this.listquyenht.filter(x => x.check === false).map(x => x.Id_LoaiDang));
    this.danhsachquyenDelete=this.listquyenht.filter(x => x.check === false).map(x => x.Id_LoaiDang).slice();
      console.log('Danh sách các quyền xóa:',this.danhsachquyenDelete);
  }

  Deletequyen()
  {
      for(let i=0;i<this.danhsachquyenDelete.length;i++)
      {
          this.services.DeleteQuyen(this.id,this.danhsachquyenDelete[i]).subscribe(res=>{
            this.LoadQuyenHT();
            this.LoadupdateQuyen();
            this.changeDetectorRefs.detectChanges();
          })
      }
  }

 updatequyen()
  {
      for(let i=0;i<this.danhsachquyenUpdate.length;i++)
      {
          this.services.UpdateQuyen(this.id,this.danhsachquyenUpdate[i]).subscribe(res=>{
            this.LoadQuyenHT();
            this.LoadupdateQuyen();
            this.changeDetectorRefs.detectChanges();
          })
      }
  }


  getCheckboxesUpdate() {
    this.danhsachquyenUpdate=this.list_updateQuyen.filter(x => x.check === true).map(x => x.Id_LoaiDang).slice();
  }


  LoadQuyenHT()
  { 
      this.services.LoadQuyenHienTai(this.id).subscribe(res=>{
        this.listquyenht=res.data;
        this.changeDetectorRefs.detectChanges();
      })
  }



  LoadupdateQuyen()
  {
    this.services.LoadUpdateQuyen(this.id).subscribe(res=>{
      this.list_updateQuyen=res.data;
      this.changeDetectorRefs.detectChanges();
    })
    
  }
  ngOnInit() {



    this.id=this.id_user;
    console.log('id_sửa quyền user',this.id);

    this.LoadQuyenHT();

    this.LoadupdateQuyen();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
