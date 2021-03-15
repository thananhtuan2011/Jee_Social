import { AuthService } from '../../../../core/auth/_services/auth.service';

import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { GroupService } from './../Bai-Dang/_Services/group.service';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaiDangService } from '../Bai-Dang/_Services/bai-dang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kt-content-left',
  templateUrl: './content-left.component.html',
  styleUrls: ['./content-left.component.scss']
})
export class ContentLeftComponent implements OnInit {

  list_group:any[]=[];
  ReloadData:Subscription;
  id_user:number;
  list_user:any[]=[];
  name_user:string;
  constructor(

    private _service_gr:GroupService,
    private tokenStore:TokenStorage,
    private _service:BaiDangService,
    private _services:GroupService,

    private _authservice:AuthService,
    private changeDetectorRefs: ChangeDetectorRef,

  ) {
    this.ReloadData = this._services.getClickEvent().subscribe(
			() => {
			
		// this.loadDataList();
		


    
		this.ngOnInit();
	
	
			}
		);

   }

   @Input() name: any;

  ngOnChanges(change: SimpleChanges) {
    if(change["name"]) {
      this.LoadListGroup();
      // console.log(change["name"]);
    }
  }


   LoadListGroup(){
      this._service_gr.getlistgroup().subscribe(res =>{
            this.list_group=res.data;
         //   this.changeDetectorRefs.detectChanges();
      })
   }

   GetCurrentUser() {
    this.tokenStore.getUserData().subscribe(res =>{
    //   this.item= res;
    console.log('Crursss',res);
      this.id_user=res.ID_user
    });
     
    
    }

    reload()
    {
   
      this._service.sendClickEvent();
			
    }
   
    loadRandomUser()
    {
      this._authservice.GetRandomUser().subscribe(res =>{
        this.list_user=res.data;
       
  })
    }
    getTT(user_name:string){
      this.name_user=user_name;
    }
  ngOnInit() {
  
    this.GetCurrentUser();
    this.LoadListGroup();
    this.loadRandomUser();
  }

}
