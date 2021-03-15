import { LayoutUtilsService } from './../../../../core/_base/crud/utils/layout-utils.service';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LuutruService } from '../luutru.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-ghim',
  templateUrl: './ghim.component.html',
  styleUrls: ['./ghim.component.scss']
})
export class GhimComponent implements OnInit {

  id_user:number;
  id_router_thongdiep:number;

	public canSendMessage: Boolean;
 
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private _services:LuutruService,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
private tokenStore:TokenStorage,

  ) { 

   

  }

  listTD:any[]=[];

  loadListGhim()
  {
    this._services.getListGhim(this.id_user).subscribe(res=>{
      this.listTD=res.data;
            
		this.changeDetectorRefs.detectChanges();
    })
  }
  

  GetCurrentUser() {
    // debugger
    this.tokenStore.getUserData().subscribe(res =>{
    //   this.item= res;
      this.id_user=res.ID_user;
    });
     
  }

  ngOnInit() {
    
    this.GetCurrentUser();

    this.loadListGhim();
  }
}
