import { DashboardService } from './../dashboard.service';

import { AuthService } from './../../../../core/auth/_services/auth.service';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { TKUser } from '../crearte_user.model';

@Component({
  selector: 'kt-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  private unsubscribe: Subject<any>;
 
  constructor(



		private changeDetectorRefs: ChangeDetectorRef,
		private auth:AuthService,
		private _services:DashboardService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserComponent>,
  
 
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

  Email:string="";
  Pass:string="";
  // Email:string=this.list_id_user[0].hoten+"@gmail.com";
  // Pass:string=this.list_id_user[0].hoten+"hufi";


    
    item_user():TKUser
    {
      const item = new TKUser();
  
  
  
    
          item.IDNV=this.list_id_user[0].id;
          item.TinhTrang=false;
          item.username=this.list_id_user[0].hoten.split(" ").splice(-1)[0];
        //    item.id_user=this.id_user;
          item.email=this.Email;
          item.pass=this.Pass;
      
      this.changeDetectorRefs.detectChanges();
      return item;
    }
    Adduser(item:TKUser,withBack:boolean){
      for(let i=0;i<this.list_id_user.length;i++)
      {
		 // debugger

      
    
      this._services.CreateUser_TK(item).subscribe(res=>{
        if (res && res.status === 1) {
          setTimeout(x => {
            this.Insert_TrangCaNhan();
          }, 1000)
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
    }
  }

  Insert_TrangCaNhan()

  {
    this._services.Create_TrangCaNhan().subscribe(res=>{

    })
  }
  
  
          Create_user_Insert()
          {
            
  
            
            let it_user=this.item_user();
      this.Adduser(it_user,false);
     
			this.changeDetectorRefs.detectChanges();
            
  
            
          }


  // loadTTuser()
	// 	{
	// 		this.auth.getProFileUsers_change(this.id_user).subscribe(res =>{	

	// 			this.listTT_user=res.Data;
	// 			this.changeDetectorRefs.detectChanges();
	// 			console.log('UUUUU',this.listTT_user);
	// 		})
	// 	}

  closeDilog()
  {
  this.dialogRef.close();
  }

  ngOnInit() {

 
// this.loadTTuser();
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
				this.selected_Assign = this.selected_Assign.filter(x => arr.includes('@' + x.hoten));
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
    this._Assign = this._Assign.substr(0, i) + data.hoten + ' ';
    // const controls = this.registerForm.controls;
    // controls['tengroup']=data.Username;
		this.list_id_user.push({ 
      id:data.id_nv,
      hoten:data.hoten
    })
    // debugger
  
    this.Email=this.removeVietnameseTones(this.list_id_user[0].hoten.split(" ").splice(-1)+"@gmail.com");
    this.Pass=this.removeVietnameseTones(this.list_id_user[0].hoten.split(" ").splice(-1)+"hufi");
    // Pass:string=this.list_id_user[0].hoten+"hufi";
    // Pass:string=this.list_id_user[0].hoten+"hufi";
    console.log('idnhanvien',this.list_id_user);
		this.myPopover_Assign.hide();
		let ele = (<HTMLInputElement>document.getElementById("InputAssign"));
		ele.value = this._Assign;
		ele.focus();
		this.changeDetectorRefs.detectChanges();
  }
removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g,"a"); 
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g,"e"); 
    str = str.replace(/??|??|???|???|??/g,"i"); 
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g,"o"); 
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g,"u"); 
    str = str.replace(/???|??|???|???|???/g,"y"); 
    str = str.replace(/??/g,"d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
updateQuyen_Default()
{
  this._services.Update_quyenDefault().subscribe(res=>
    {
      this.changeDetectorRefs.detectChanges();
    })
}
  submit()
  { 
        this.Create_user_Insert();
        setTimeout(x => {
          this.updateQuyen_Default();
        }, 500)

      

       
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
