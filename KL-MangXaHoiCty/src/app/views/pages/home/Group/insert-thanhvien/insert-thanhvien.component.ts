import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { AuthNoticeService } from './../../../../../core/auth/auth-notice/auth-notice.service';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { PopoverContentComponent } from 'ngx-smart-popover';
import { UserGroupModel } from '../group_user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';



@Component({
  selector: 'kt-insert-thanhvien',
  templateUrl: './insert-thanhvien.component.html',
  styleUrls: ['./insert-thanhvien.component.scss']
})
export class InsertThanhvienComponent implements OnInit {
  private unsubscribe: Subject<any>;
 
  constructor(


    private tokenStore:TokenStorage,
		private authNoticeService: AuthNoticeService,

		private changeDetectorRefs: ChangeDetectorRef,
		private auth:AuthService,
		private _services:GroupService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    private sharedService:SharedService,
    public dialogRef: MatDialogRef<InsertThanhvienComponent>,
    
  ) { 
   
  }
  
  @ViewChild('Assign', { static: true }) myPopover_Assign: PopoverContentComponent;
  @ViewChild('hiddenText', { static: true }) textEl: ElementRef;
	@ViewChild('hiddenText_Assign', { static: true }) text_Assign: ElementRef;
  selected: any[] = [];
  listUser: any[] = [];
	selected_Assign: any[] = [];
	options: any = {};
  options_assign: any = {};
   id_g: any;
	_color: string = '';
	_Follower: string = '';
	_Assign: string = '';
	list_Assign: any[] = [];
	list_id_user=[];
  id_user:number;
  registerForm: FormGroup;
  user:any[]=[];
  listTT_user:any[] = [];
  @Output() ItemSelected = new EventEmitter<any>();
  

 
	GetCurrentUser() {
		// debugger
		this.tokenStore.getUserData().subscribe(res =>{
		  
		  this.user=res;
		  this.id_user=res.ID_user;
		  
		});

	}
			closeDilog()
			{
			this.dialogRef.close();
			}


    
    item_user_group_admin():UserGroupModel
    {
      const item = new UserGroupModel();
  
  
  
    
         // debugger
          item.Id_Group=this.id_g;
        //    item.id_user=this.id_user;
          item.quyen_group=false;
      
      this.changeDetectorRefs.detectChanges();
      return item;
    }
    Adduser(item:UserGroupModel,withBack:boolean){
      for(let i=0;i<this.list_id_user.length;i++)
      {
		 // debugger
        this.id_user=this.list_id_user[i].id;
      
    
      this._services.InsertUserGroup(this.id_g,this.id_user,item).subscribe(res=>{
        if (res && res.status === 1) {
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
    }
  }
  
  
          Group_user_Insert()
          {
            
  
            
            let it_gr_u=this.item_user_group_admin();
			this.Adduser(it_gr_u,false);
			this.changeDetectorRefs.detectChanges();
            
  
            
          }

  loadListUser()
  {
    this.auth.getAllUsers().subscribe(res=>{
      this.listUser=res.data;
    })
  }

  getData(){
			
    this.sharedService.id_group.subscribe(sharedata => this.id_g = sharedata)
	this.changeDetectorRefs.detectChanges();

  }

  loadTTuser()
		{
			this.auth.getProFileUsers_change().subscribe(res =>{	

				this.listTT_user=res.data;
				this.changeDetectorRefs.detectChanges();
				console.log('UUUUU',this.listTT_user);
			})
		}


  ngOnInit() {

       this.getData();
    this.GetCurrentUser();
this.loadListUser();
this.loadTTuser();
this.changeDetectorRefs.detectChanges();


   
  }

  select(user) {
		this.ItemSelected.emit(user)
	}
	click_Assign($event, vi = -1) {
		this.myPopover_Assign.hide();
	}
	  onSearchChange_Assign($event) {
		this._Assign = (<HTMLInputElement>document.getElementById("InputAssign")).value;

		if (this.selected_Assign.length > 0) {
			var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
			var match = this._Assign.match(reg);
			if (match != null && match.length > 0) {
				let arr = match.map(x => x);
				this.selected_Assign = this.selected_Assign.filter(x => arr.includes('@' + x.Username));
			} else {
				this.selected_Assign = [];
			}
		}
		this.options = this.getOptions_Assign();
		if (this.options.keyword) {
			let el = $event.currentTarget;
			let rect = el.getBoundingClientRect();
			this.myPopover_Assign.show();
			this.changeDetectorRefs.detectChanges();
		}

		
	}
	
	
	getKeyword_Assign() {
		let i = this._Assign.lastIndexOf('@');
		if (i >= 0) {
			let temp = this._Assign.slice(i);
			if (temp.includes(' '))
				return '';
			return this._Assign.slice(i);
		}
		return '';
	}
	getOptions_Assign() {
		var options_assign: any = {
			showSearch: false,
			keyword: this.getKeyword_Assign(),
			data: this.listUser.filter(x => this.selected_Assign.findIndex(y => x.id_nv == y.id_nv) < 0),
		};
		return options_assign;
	}

	ItemSelected_Assign(data) {
		this.selected_Assign = this.list_Assign;
		this.selected_Assign.push(data);
		let i = this._Assign.lastIndexOf('@');
    this._Assign = this._Assign.substr(0, i) + '@' + data.Username + ' ';
    // const controls = this.registerForm.controls;
    // controls['tengroup']=data.Username;
		this.list_id_user.push({ 
			id:data.ID_user
		})
		this.myPopover_Assign.hide();
		let ele = (<HTMLInputElement>document.getElementById("InputAssign"));
		ele.value = this._Assign;
		ele.focus();
		this.changeDetectorRefs.detectChanges();
  }
  
  submit()
  {
	this.Group_user_Insert();
	this.closeDilog();
	this.changeDetectorRefs.detectChanges();
  }
 
	/**
	 * Form Submit
	 */


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
  
 
}
