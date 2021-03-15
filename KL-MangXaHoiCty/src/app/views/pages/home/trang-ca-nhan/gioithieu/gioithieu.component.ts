import { FlowCaNhanService } from './../../../Flow-Trang-ca-nhan/flow-ca-nhan.service';
import { TrangCaNhanService } from './../trang-ca-nhan.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.scss']
})
export class GioithieuComponent implements OnInit {
  id_user_current:number;
  item:any[]=[];
  list_randomanh:any[]=[];
  listGioiThieu:any[]=[];
  list_Flow:any[]=[];
  listTrangCaNhan:any[]=[];
  id_canhan:number;
  constructor(
    private tokenStore:TokenStorage,
    private _service:TrangCaNhanService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service_flow:FlowCaNhanService,

  ) { }

  getCurrentUser() 
	{
	  this.tokenStore.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.ID_user;
	 
  
	  });
  }

  LoadGioiThieu()
  {
        this._service.getGioiThieu(this.id_user_current).subscribe(res =>{
          this.listGioiThieu=res.data;
          this.changeDetectorRefs.detectChanges();
        })
  }

  LoadOneImage()

  {
	this._service.getRanDomAnh(this.id_user_current).subscribe(res=>{
	this.list_randomanh=res.data;
	this.changeDetectorRefs.detectChanges();
	})

  }
  LoadTrangCaNhan()
  {
      this._service.gettrangCaNhan().subscribe(res=>{
		this.listTrangCaNhan=res.data;
    this.id_canhan=this.listTrangCaNhan[0].id_canhan;
    console.log('id-canhan',this.id_canhan)
    this.LoadFlow(this.id_canhan);
        this.changeDetectorRefs.detectChanges();
      })
  }
 
  LoadFlow(id:number)

  {
 
        this._service_flow.getFlow(id).subscribe(res=>{
          
          this.list_Flow=res.data;
              this.changeDetectorRefs.detectChanges();
        })
  }
  ngOnInit() {
    this.getCurrentUser();

    this.LoadGioiThieu();
    this.LoadOneImage();
    this.LoadTrangCaNhan();
   
    // setTimeout(() => {
    //   this.LoadFlow();
    // }, 1000);
    
  }

}
