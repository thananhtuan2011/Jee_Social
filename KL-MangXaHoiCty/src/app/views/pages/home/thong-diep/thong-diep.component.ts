import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaiDangService } from '../Bai-Dang/_Services/bai-dang.service';
import { ThongdiepService } from './thongdiep.service';

@Component({
  selector: 'kt-thong-diep',
  templateUrl: './thong-diep.component.html',
  styleUrls: ['./thong-diep.component.scss']
})
export class ThongDiepComponent implements OnInit {

  // check=false;
  check=true;
  listrd_khenthuong:any[]=[];
  listrd_thongdiep:any[]=[];
  constructor(

    private _service:BaiDangService,
    private _service_td:ThongdiepService,
    
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }





  loadrandomKt()
  {
      this._service.GetDSKhenThuong_Top2().subscribe(res=>{

          this.listrd_khenthuong=res.data;
        //  this.changeDetectorRefs.detectChanges();
	


      })
  }

  
  loadrandomTD()
  {
      this._service_td.getrandomDSThongDiep().subscribe(res=>{

          this.listrd_thongdiep=res.data;
          this.changeDetectorRefs.detectChanges();
	


      })
  }
  ngOnInit() {
    this.loadrandomKt();
    this.loadrandomTD();
  }

}
