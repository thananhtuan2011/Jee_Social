
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangService } from './../_Services/bai-dang.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'kt-de-xuat-edit',
  templateUrl: './de-xuat-edit.component.html',
  styleUrls: ['./de-xuat-edit.component.scss']
})
export class DeXuatEditComponent implements OnInit {


  dexuat: any = {};
  item:any[]=[];
  id_user:number;
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<DeXuatEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:BaiDangService,
    private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDia(data = undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
 // debugger
  this._service.UpdateBaiDang(this.dexuat).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDia(res.data);
    }
  });
}
getCurrentUser() 
{
  this.tokenStore.getUserData().subscribe(res =>{
   
      this.item= res;
      this.id_user=res.ID_user;
 

  });
}

  ngOnInit() {
    this.getCurrentUser();
    this.dexuat = this.data;
    this.changeDetectorRefs.detectChanges();
    
  }


}
