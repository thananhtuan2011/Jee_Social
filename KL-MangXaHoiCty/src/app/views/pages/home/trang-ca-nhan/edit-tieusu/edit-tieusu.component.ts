import { TrangCaNhanService } from './../trang-ca-nhan.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-edit-tieusu',
  templateUrl: './edit-tieusu.component.html',
  styleUrls: ['./edit-tieusu.component.scss']
})
export class EditTieusuComponent implements OnInit {
  list_tieusu: any = {};
  constructor(
    public dialogRef: MatDialogRef<EditTieusuComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
   private _service:TrangCaNhanService,
    // private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  closeDia(data = undefined)
  {
      this.dialogRef.close(data);
  }
  onSubmit() {
   
    this._service.UpdateTieuSu(this.list_tieusu).subscribe(res => {
      if (res && res.status == 1) {
        this.closeDia(res.data);
      }
    });
  }
  
  ngOnInit() {
    this.list_tieusu = this.data;
    this.changeDetectorRefs.detectChanges();
  }

}
