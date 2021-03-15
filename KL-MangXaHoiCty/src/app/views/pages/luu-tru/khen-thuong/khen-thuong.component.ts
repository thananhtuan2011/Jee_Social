import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LuutruService } from '../luutru.service';

@Component({
  selector: 'kt-khen-thuong',
  templateUrl: './khen-thuong.component.html',
  styleUrls: ['./khen-thuong.component.scss']
})
export class KhenThuongComponent implements OnInit {

  constructor(
    private _services:LuutruService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router:Router,
  ) { }

  item:any[]=[];

  loadListKhenThuong()
  {
    this._services.getListLuuTruKhenThuong().subscribe(res=>{
      this.item=res.data;
            
		this.changeDetectorRefs.detectChanges();
    })
  }

  // onSelect(it)
  // {
  //       this.router.navigate(['/detail',it.Id_BaiDang])
  // }
  ngOnInit() {
    this.loadListKhenThuong();

    
  }

}
