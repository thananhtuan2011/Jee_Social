import { ImageModel } from './../../../pages/home/Bai-Dang/Model/Img.model';
import { UploadfileService } from './../../../pages/home/Bai-Dang/_Services/uploadfile.service';
import { LayoutUtilsService, MessageType } from './../../../../core/_base/crud/utils/layout-utils.service';
import { AuthService } from './../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { User } from './../../../../core/auth/_models/user.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProfileService } from '../profile.service';
import { ProfileModel } from '../Model_profile/myprofile.model';
import { UserProfileModel } from '../Model_profile/user_Ac.model';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { MatDialog } from '@angular/material';
import { ChangePassComponent } from '../change-pass/change-pass.component';
import { Router } from '@angular/router';


@Component({
  selector: 'kt-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  registerForm: FormGroup;
	loading = false;
	errors: any = [];
	// biến show hide của password
	hide = true;
	txtemail:string;
	txtpass:string;
	//bing dữ liệu
	sharedData: string; //  dữ liệu cầN share
  item:any[]=[];
  id_user:number;
  list_userprofile:any[]=[];
  list_nv:any[]=[];
test:string=''
Username:string;
sdt:string;
diachi:string;
gioitinh:string;
ngaysinh:Date;
id_nv:number;
fotmatns:string;
filesAmount: File = null;
image: any;
base64Image: string;
nameimg:any;
	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		
		private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private tokenStorage:TokenStorage,
    private auth: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private _services:ProfileService,
	public dialog: MatDialog,
	private _service_file:UploadfileService,
	private router:Router
	
    
	
	
	) {
		this.unsubscribe = new Subject();
		this.initRegisterForm();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */


	onSelectFile_PDF(event) {

		if (event.target.files && event.target.files[0]) {
		 
				var filesAmount = event.target.files[0];
		  var Strfilename = filesAmount.name.split('.');
		
			
	
			
				var reader = new FileReader();
				//this.FileAttachName = filesAmount.name;
				let base64Str: any;
				reader.onload = (event) => {
			this.image=reader.result;
		  this.base64Image = ''+event.target["result"];
		  this.nameimg=filesAmount.name;
		  this.base64Image = this.base64Image.split(',')[1];
		  
				// base64Str = event.target["result"]
					// // var metaIdx = base64Str.indexOf(';base64,');
					// base64Str = base64Str.substr(metaIdx + 8); // Cắt meta data khỏi chuỗi base64
	
					// //this.FileAttachStrBase64 = base64Str;
			
					// 	this.AttachFileComment.push({ filename: filesAmount.name, strBase64: base64Str });
						this.cdr.detectChanges();
			
					}
				}
	
				reader.readAsDataURL(filesAmount);
	
			}
	   
		Item_hinh(): ImageModel {
		 
		  const item = new ImageModel();
		
	
			   item.image=this.base64Image;
			   if(this.nameimg==="")
			   {
				item.name=null;
			   }
			   else
	
			   {
				item.name=this.nameimg;
			   }
			  
		  
		  this.cdr.detectChanges();
		  return item;
		}
			
			
			  
	
	

      insert_file()
      {
		let hinh=this.Item_hinh();
         this._service_file.postAvatar(hinh).subscribe((res) => {
			this.cdr.detectChanges();
			  });
      }

  getCurrentUser() 
  {
    this.tokenStorage.getUserData().subscribe(res =>{
     
        this.item= res;
	
		 this.id_user=res.ID_user;
		
        this.cdr.detectChanges();
   
        
    });
  }

  loadListData() 
  {
this.auth.getProFileUsers_change().subscribe(res=>{
  this.list_userprofile=res.data;
  this.Username=this.list_userprofile[0].Username;

  console.log('profie',this.list_userprofile);
  this.cdr.detectChanges();

})
  }
  
  Item_Ac(): UserProfileModel {
    const item = new UserProfileModel();
  

		item.username=this.Username;
		//set username
		
		
    
    this.cdr.detectChanges();
    return item;
  }
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  updateAc(item:UserProfileModel,withBack:boolean){
  
      this._services.Update_User(this.id_user,this.id_nv,item).subscribe(res=>{
        if (res && res.status === 1) {
         
         
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
        
  UpdateAc()
  {
    let it_ac=this.Item_Ac();
     this.updateAc(it_ac,false);
  }


  
  Item_NV(): ProfileModel {
	
    const item = new ProfileModel();
  

        item.diachi=this.diachi;
		item.sdt=this.sdt;
		item.gioitinh=this.gioitinh;



		item.ngaysinh=formatDate(this.ngaysinh,'yyyy/MM/dd','en');


    
    this.cdr.detectChanges();
    return item;
  }
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  updatenv(item:ProfileModel,withBack:boolean){
  
      this._services.Update_NV(this.id_user,this.id_nv,item).subscribe(res=>{
        if (res && res.status === 1) {
         
         
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
        
  UpdateNv()
  {
    let it_nv=this.Item_NV();
     this.updatenv(it_nv,false);
  }
  
	  getNV()
	  {
		  this._services.getNV().subscribe(res=>{
			  debugger
			this.list_nv=res.data;
			console.log('NV',this.list_nv);
			this.id_nv=this.list_nv[0].ID_NV
			 this.diachi=this.list_nv[0].diachi;
				this.gioitinh=this.list_nv[0].gioitinh;
				this.sdt=this.list_nv[0].sdt;
				this.ngaysinh=this.list_nv[0].ngaysinh;
				this.cdr.detectChanges();

		  })
	  }



	  
TrangThaiUpdate(): User {
	// debugger


	//const controls = this.itemForm.controls;
	
	const user = new User();
	// user.ID_User = this.item.ID_User;

	

	 //debugger
	 user.ID_User =	this.id_user;
	user.TinhTrang =true;
	this.cdr.detectChanges();
	return user;
}


UpdateItem(item: User, withBack: boolean) {
	// this.loadingAfterSubmit = true;
	this.auth.updateTrangThaiUser(item).subscribe(res => {
		
	});
}

	  Submit()
	  {
		
		this.UpdateNv();
		this.UpdateAc();
		this.cdr.detectChanges();
		this.insert_file();


		let updatetrangthai=this.TrangThaiUpdate();
		this.UpdateItem(updatetrangthai,false);
	
	
	// this.getNV();
		// window.location.href ='/home'
		// this.ngOnInit();
	  }
	  ChangePassWork()
	  {
		 {
			// var data = Object.assign({}, item);
			// var data = Object.assign({}, item);
			const dialogRef = this.dialog.open(ChangePassComponent, { 
				
				width: '500px' });
			dialogRef.afterClosed().subscribe(res => {
				if (res) {
					// item.comment = res.comment
					// this.loadDataList();
					// this.changeDetectorRefs.detectChanges();
				}
				else
				{
					// this.loadDataList();
					// this.changeDetectorRefs.detectChanges();
				}
			});
		
	  }
	}

	ngOnInit() {
    
	this.getCurrentUser();
	this.getNV();
    this.loadListData();
	
	}



	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			// fullname: ['', Validators.compose([
			// 	Validators.required,
				
			// 	Validators.maxLength(100)
			// ])
			// ],
			gmail: ['', Validators.compose([
				Validators.required,
				Validators.email,
			
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			
			]),
			],

			phone: ['', Validators.compose([
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(11)
			])
			],
			address: ['', Validators.compose([
				Validators.required,
			
				// Validators.maxLength(100)
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
			
				// Validators.maxLength(100)
			]),
			],
			date: ['', Validators.compose([
				Validators.required,
			
			])
			
			],
			gioitinh: ['', Validators.compose([
				Validators.required,
			
			])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			// validator: ConfirmPasswordValidator.MatchPassword
		});
	}
// đẩy dữ liệu ra 
	

	/**
	 * Form Submit
	 */


	onsubmit() {
		const controls = this.registerForm.controls;

		// check form
	
		this.loading = true;
		// debugger
		if (!controls['agree'].value) {
			
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
				alert("Vui lòng check agree !")
			return;
			
		}
		else

		{
			this.Submit();
			this.loadListData();

			setTimeout(function(){
				window.location.href ='/home'
			  },1000);
		
			// this.router.navigate(['/home']);
			// this.tokenStorage.getUserNameUser().subscribe(res =>{
			// 	this.item= res;
			// 	console.log(res)
				
				
			// });
		}
		

	
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	


}
