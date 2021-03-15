import { QueryParamsModelNew } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { BaidangEditComponent } from './../../home/Bai-Dang/baidang-edit/baidang-edit.component';
import { UploadfileService } from './../../home/Bai-Dang/_Services/uploadfile.service';


import { AuthService } from './../../../../core/auth/_services/auth.service';


// import { CommentEditDialogComponent } from './../comment/comment-edit-dialog/comment-edit-dialog.component';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TokenStorage } from '../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud/utils/layout-utils.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LeavePersonalCBCCModel }from '../../../../core/auth/_models/typepost.model';
import { TranslateService } from '@ngx-translate/core';

import { ThongbaoService } from '../../home/Bai-Dang/_Services/thongbao.service';
import { CommentService } from '../../home/Bai-Dang/_Services/comment.service';
import { ThongBaoModel } from '../../home/Bai-Dang/Model/ThongBao.model';
import { CommentEditDialogComponent } from '../../home/Comment/comment-edit-dialog/comment-edit-dialog.component';
import { TinNhanhEditComponent } from '../../home/Bai-Dang/tin-nhanh-edit/tin-nhanh-edit.component';
import { ChaoDonThanhvienEditComponent } from '../../home/Bai-Dang/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from '../../home/Bai-Dang/khen-thuong-edit/khen-thuong-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BaiDangService } from '../../home/Bai-Dang/_Services/bai-dang.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../../home/media/media.service';
import { HttpClient } from '@angular/common/http';
import { MediaDetailComponent } from '../../home/media/media-detail/media-detail.component';
import { TypePostComponent } from '../../home/type-post/type-post.component';
import { ImageModel } from '../../home/Bai-Dang/Model/Img.model';
import { BaiDangModel } from '../../home/Bai-Dang/Model/Bai-dang.model';
import { DeXuatEditComponent } from '../../home/Bai-Dang/de-xuat-edit/de-xuat-edit.component';
import { CommentModel } from '../../home/Bai-Dang/Model/comment.model';
import { MediaComponent } from '../../home/media/media.component';
@Component({
  selector: 'kt-quanly-baidang-dang2',
  templateUrl: './quanly-baidang-dang2.component.html',
  styleUrls: ['./quanly-baidang-dang2.component.scss']
})
export class QuanlyBaidangDang2Component implements OnInit {

  item_11:any[]=[];
  data: any[] = [];
 
 
//  data: any[] = [];
  filter: any = {};
  cmt:any[]=[];
  // dataSource: BaiDangDataSource;
  @ViewChild("keyword", { static: true }) keyword: ElementRef;
  
	// listResult = new Subject();
	example: string = `<div>this is another div <br/> Đây là inser</div>`
	// Public properties
	ItemData: any = {};
	nameimg:any;
	FormControls: FormGroup;
	hasFormErrors: boolean = false;
	disBtnSubmit: boolean = false;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	viewLoading: boolean = false;
	isChange: boolean = false;
	isZoomSize: boolean = false;
	LstDanhMucKhac: any[] = [];
	public datatreeDonVi: BehaviorSubject<any[]> = new BehaviorSubject([]);
	private componentSubscriptions: Subscription;

	ListDonViCon: any[] = [];
	ListVanBan: any[] = [];
	datasource: any;

	ListAttachFile: any[] = [];
	ListYKien: any[] = [];
	AcceptInterval: boolean = true;
	NguoiNhan: string = '';
	//NguoiNhans:any[]=[{FullName:'người 1'},{FullName:'người 2'}];

	Comment: string = '';
	AttachFileComment: any[] = [];
	fileControl: FormControl;
	setting: any = {
		ACCEPT_DINHKEM: '',
		MAX_SIZE: 0
	};
	files: any = {};
	//reload: boolean = true;
	UserData: any = {};
	emotions: any = {};
	accounts: any = {};
	icons: any[] = [];
	id_user:number;
	list_icon: any[] = [];
	public anchors;
	//tag username
	@ViewChild('myPopoverC', { static: true }) myPopover: PopoverContentComponent;
	selected: any[] = [];
	listUser: any[] = [];
	options: any = {};
	@ViewChild('matInput', { static: true }) matInput: ElementRef;
	@ViewChild('hiddenText', { static: true }) textEl: ElementRef;
	CommentTemp: string = '';
	indexxxxx: number = -1;
	@ViewChild('myPopoverB', { static: true }) myPopoverU: PopoverContentComponent;
  it: any = {};
  tt:boolean=true;
  isShow=true;
  isShowForm=false;
  id_baidang_cmt:number;
  filesAmount: File = null;
  id_bd_cmt:number;
	item:any;
  dulieu_cmt = new FormControl('');
  edit_dulieu_cmt=new FormControl('');
  base64Image: string;

  image: any;
	ListMedia:any[]=[];
  dulieu_cmt_child:string=''
  @Input() ID_QuyTrinh: any;
  listKhenThuong:any[] = [];

  listTT_user:any[] = [];
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
  
    public _services:BaiDangService ,
    private _service_cmt:CommentService,
    private sanitized: DomSanitizer,
	public dialog: MatDialog,
	private tokenStore:TokenStorage,
	private layoutUtilsService: LayoutUtilsService,
	private translate: TranslateService,

	private _service_file:UploadfileService,
	private auth:AuthService,

	private http: HttpClient
  ) { }



// height: number = 300;
// onScroll($event) {
// 	let _scroll = 300;
// 	let _height = _scroll + $event.currentTarget.scrollTop;
// 	this.height = _height;
// }


//  @HostListener('window:scroll', ['$event']) 
 





ViewDetail(item,index,indexc=-1)
{	var data = Object.assign({}, item);
  const dialogRef = this.dialog.open(MediaDetailComponent, {

	width: '700px' ,
	height: '500px',
	data:data});
  dialogRef.afterClosed().subscribe(res => {
	if (res) {
		item.media = res.media
		this.loadDataList();
	 // this.changeDetectorRefs.detectChanges();
	}
	else
	{
		this.loadDataList();
	// this.changeDetectorRefs.detectChanges();
	}
  });
}

TaoTin() {

	// var data = Object.assign({}, item);
	const dialogRef = this.dialog.open(MediaComponent, {
		
		width: '700px' ,
		height: '500px'});
	dialogRef.afterClosed().subscribe(res => {
		if (res) {
		
			this.loadDataList();
			this.changeDetectorRefs.detectChanges();
		}
		else
		{
			this.loadDataList();
			this.changeDetectorRefs.detectChanges();
		}
	});
}
	
Item_thongbao(): ThongBaoModel {
    const item = new ThongBaoModel();
  

		 item.title="Đã  bình luận một bài viết :";
		 item.id_cmt=1;
        item.create_tb_by=this.id_user;
    
    this.changeDetectorRefs.detectChanges();
    return item;
  }

 
  
 


	filterConfiguration(): any {
		return this.filter;
  }

 
          
        //	Popup thêm mới, chỉnh sửa
        addLeave() {
          // const leavePersonalModel = new LeavePersonalCBCCModel();
          // leavePersonalModel.clear(); // Set all defaults fields
          // this.EditLeave(leavePersonalModel);
          const dialogRef = this.dialog.open(TypePostComponent,{
            data:{  }

          });
          
          dialogRef.afterClosed().subscribe(res => {
            if (!res) {
			
              this.loadDataList();
           this.changeDetectorRefs.detectChanges();
            }
            else {
				
               this.loadDataList();
              this.changeDetectorRefs.detectChanges();
            }
          });
          
            
          
         
        }
        EditLeave(_item: LeavePersonalCBCCModel) {

          let saveMessageTranslateParam = '';
          saveMessageTranslateParam += _item.ID_Row > 0 ? this.translate.instant('JeeHR.capnhatthanhcong') : this.translate.instant('JeeHR.themthanhcong');
          const _saveMessage = this.translate.instant(saveMessageTranslateParam);
          const _messageType = _item.ID_Row > 0 ? MessageType.Update : MessageType.Create;
          const dialogRef = this.dialog.open(TypePostComponent, { data: { }});
          dialogRef.afterClosed().subscribe(res => {
            if (!res) {
              // this.loadDataList();
            }
            else {
              // this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 4000, true, false);
              // this.loadDataList();
            }
          });
		}
		


	InsertMedia()
	{

	}

    LoadData() {
      // debugger
      this.tokenStore.getUserData().subscribe(res =>{
        this.item_11= res;
      });
    }
//   Thêm comment trong bài đăng


  layIDBaiDang(id_baidang_cmt:number){
	 
		this.id_bd_cmt=id_baidang_cmt;
	console.log('id_baidangcmt',id_baidang_cmt);

  }
Item_cmt(): CommentModel {
	//debugger
	const item = new CommentModel();

			item.ID_BaiDang=this.id_bd_cmt;
			item.NoiDung_cmt=this.dulieu_cmt.value;
	
			item.typepost=1;
			// item.CreatedDate
		
	
	this.changeDetectorRefs.detectChanges();
	return item;
}




// Bắt đầu phần comment

AddComment(item:CommentModel,withBack:boolean){

		this._service_cmt.InsertComnent(item).subscribe(res=>{
			if (res && res.status === 1) {
				this.dulieu_cmt.setValue("");
				this.loadDataList();
				// this.dialogRef.close();
			   //  this.dataSource.loadListBaiDang();
				
					 }
					 else {
						 this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
					 }
		})
}
Item_hinh_cmt(): ImageModel {
     
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
		
	
	this.changeDetectorRefs.detectChanges();
	return item;
  }
	  
	  
		

	insert_file()
	{
	
	  let hinh=this.Item_hinh_cmt();
   
	
	   this._service_file.postWithFile_Comment(hinh).subscribe((res) => {

			});
	}


		

	


			// id_cmt:number,noidung:string, id_user:number
			// update comment
		



		// kết thúc phần comment
		
// Bắt đầu phần bài đăng
creaFormDelete(id_baidang:number)
		{
			const _title = this.translate.instant('Xóa Bài Đăng');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
		//debugger
		// xóa cmt trong bài đăng
		// this.delete_cmt_BaiDang(id_baidang)
		//xóa like  trong bài đăng
		
		this.delete_like_BaiDang(id_baidang)
				this._services.DeleteBaidang(id_baidang).subscribe(res => {
					this.loadDataList();

						
					this.layoutUtilsService.OffWaitingDiv();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				
					
				});
			});
		 }

		 // xóa like trong bài đăng

		 delete_like_BaiDang(id_baidang:number)
		 {
		 
		 
			 this._services.Delete_like_Baidang(id_baidang).subscribe(res => {
			 
			 })
			 this.changeDetectorRefs.detectChanges();
			 
		 //	this.loadDataList();
		 
		 }
		 
		 UpdateBaiDang_CKeditor(id_:number) {
			 
			//debugger
			this.item=( this.data.find(x => x.Id_BaiDang ==id_));
		
				
			 var _item = new BaiDangModel;
			let saveMessageTranslateParam = '';
			 _item = this.item;
			// saveMessageTranslateParam += _item. > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
			// const _saveMessage = this.translate.instant(saveMessageTranslateParam);
			// const _messageType = _item.id_row > 0 ? MessageType.Update : MessageType.Create;
			const dialogRef = this.dialog.open(BaidangEditComponent, {
				width: '500px',
				height:'500px',
				data: {_item} })
			
			dialogRef.afterClosed().subscribe(res => {

				if (res) {
						this.loadDataList();
					// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
					this.changeDetectorRefs.detectChanges();
				}
				else
				{
					this.loadDataList();
				}
			});
		}
	
			// Update bài đăng tin nhanh

			Update_BAIDANG(item,index,indexc=-1) {
				//	debugger
					var data = Object.assign({}, item);
					// var data = Object.assign({}, item);
					const dialogRef = this.dialog.open(TinNhanhEditComponent, { data:data,
						
						width: '500px' });
					dialogRef.afterClosed().subscribe(res => {
						if (res) {
							item.tinnhanh = res.tinnhanh
							this.loadDataList();
							this.changeDetectorRefs.detectChanges();
						}
						else
						{
							this.loadDataList();
							this.changeDetectorRefs.detectChanges();
						}
					});
				}

				Update_BAIDANG_7(item,index,indexc=-1) {
						//debugger
						var data = Object.assign({}, item);
						// var data = Object.assign({}, item);
						const dialogRef = this.dialog.open(DeXuatEditComponent, { data:data,
							
							width: '500px' });
						dialogRef.afterClosed().subscribe(res => {
							if (res) {
								item.dexuat = res.dexuat
								this.loadDataList();
								this.changeDetectorRefs.detectChanges();
							}
							else
							{
								this.loadDataList();
								this.changeDetectorRefs.detectChanges();
							}
						});
					}
	
			//  like trong bài đăng

			// Update_BAIDANG_4(item,index,indexc=-1) {
			// 	//	debugger

			// 		var data = Object.assign({}, item);
			// 		// var data = Object.assign({}, item);
			// 		const dialogRef = this.dialog.open(ChaoDonThanhvienEditComponent, { data:data,
						
			// 			width: '500px' });
			// 		dialogRef.afterClosed().subscribe(res => {
			// 			if (res) {
			// 				item.chaodonthanhvien = res.chaodonthanhvien
			// 				this.loadDataList();
			// 				this.changeDetectorRefs.detectChanges();
			// 			}
			// 			else
			// 			{
			// 				this.loadDataList();
			// 				this.changeDetectorRefs.detectChanges();
			// 			}
			// 		});
			// 	}
				Update_BAIDANG_4(id_:number) {
					//	debugger
					this.item=( this.data.find(x => x.Id_BaiDang ==id_));
				
						
					var _item = new BaiDangModel;
				   let saveMessageTranslateParam = '';
					_item = this.item;
				  
				   const dialogRef = this.dialog.open(ChaoDonThanhvienEditComponent, {
					   width: '500px',
					   height:'400px',
					   data: {_item} })
				   
				   dialogRef.afterClosed().subscribe(res => {
	   
					   if (res) {
							   this.loadDataList();
						   // this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
						   this.changeDetectorRefs.detectChanges();
					   }
					   else
					   {
						   this.loadDataList();
					   }
				   });
				}

				// Update_BAIDANG_2(item,index,indexc=-1) {
				// 		debugger
					
				// 		var data = Object.assign({}, item);
				// 		// var data = Object.assign({}, item);
				// 		const dialogRef = this.dialog.open(KhenThuongEditComponent, { data:data,
							
				// 			width: '500px' });
				// 		dialogRef.afterClosed().subscribe(res => {
				// 			if (res) {
				// 				item.khenthuong = res.khenthuong
				// 				this.loadDataList();
				// 				this.changeDetectorRefs.detectChanges();
				// 			}
				// 			else
				// 			{
				// 				this.loadDataList();
				// 				this.changeDetectorRefs.detectChanges();
				// 			}
				// 		});
				// 	}
				UpdateBaiDang_2(id_:number) {
			 
					
					this.item=( this.data.find(x => x.Id_BaiDang ==id_));
				
						
					 var _item = new BaiDangModel;
					let saveMessageTranslateParam = '';
					 _item = this.item;
					// saveMessageTranslateParam += _item. > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
					// const _saveMessage = this.translate.instant(saveMessageTranslateParam);
					// const _messageType = _item.id_row > 0 ? MessageType.Update : MessageType.Create;
					const dialogRef = this.dialog.open(KhenThuongEditComponent, {
						width: '700px',
						height:'500px',
						data: {_item} })
					
					dialogRef.afterClosed().subscribe(res => {
		
						if (res) {
								this.loadDataList();
							// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
							this.changeDetectorRefs.detectChanges();
						}
						else
						{
							this.loadDataList();
						}
					});
				}
	
				Item_thongbao_like_baidang(): ThongBaoModel {
					const item = new ThongBaoModel();
				
						 item.title="Đã bày tỏ cảm xúc bài viết của bạn";
						 item.id_bd=1;
						item.create_tb_by=this.id_user;
					
					this.changeDetectorRefs.detectChanges();
					return item;
				  }
				
				 
			
				  
					
		like(id:number,type:number) {
			//debugger
			this._services.like(id,type).subscribe(res => {
				if (res && res.status == 1) {
					// item.Like = res.data.Like;
					// item.Likes = res.data.Likes;
			
					this.loadDataList();
					this.changeDetectorRefs.detectChanges();
				}
			})
		}

		

//   lấy list like (haha, love.....)

		GetListLike()
		{
			this._services.getlist_like().subscribe(res => {
				this.list_icon=res.Data;
				this.changeDetectorRefs.detectChanges();

			})
		}



	
// load  dữ liệu bài đăng (cmt,like) bằng datasource để realtime
  loadDataList() {
	const queryParams1 = new QueryParamsModelNew(
		this.filterConfiguration()
	);
	
	this._services.getlistBaiDang(queryParams1).subscribe((res) => {
	
			this.data= res.data;
	
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
  // bài đăng loại 2 
  ListKhenThuong()
  {
	  this._services.getListKhenThuong().subscribe(res=>{
		  this.listKhenThuong=res.Data;

		  this.changeDetectorRefs.detectChanges();

	  })
  }







  change() {
	this.loadDataList();
	//get user current
	
	this.changeDetectorRefs.detectChanges();
  }
  loadTTuser()
  {
	  this.auth.getProFileUsers_change().subscribe(res =>{	

		  this.listTT_user=res.Data;
		  this.changeDetectorRefs.detectChanges();
		 
	  })
  }

  ngOnInit() {
	this.GetCurrentUser();
    this.LoadData();
    // this.dataSource = new BaiDangDataSource (this._services);
   //get list bài đăng
   this.loadDataList();
   //get user current
  
   // get list icons
   this.GetListLike();
   //get list nhân viên được khen thưởng
   this.ListKhenThuong();
   this.loadTTuser();
  
//    this.loadInitPost();
  //  this.loadcmt();
  
  }



	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}

		// if (this.interval) {
		// 	clearInterval(this.interval);
		// }

		this.AcceptInterval = false;
	}



	/**
	 * Create form
	 */
	createForm() {
	

		for (var i = 0; i < this.ListYKien.length; i++) {
			this.ListAttachFile.push([])
		
		}
	}

	GetListAttach(ind: number): any {
		return this.ListAttachFile[ind];
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.FormControls.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSubmit(type: boolean) {
		let ArrDVC: any[] = [];
		for (var i = 0; i < this.ListDonViCon.length; i++) {
			if (this.ListDonViCon[i].check) {
				ArrDVC.push(this.ListDonViCon[i]);
			}
		}
		if (type) {
			//this.dialogRef.close(ArrDVC);
		}
		else {
			//this.dialogRef.close();
		}
	}

	ShowOrHideComment(ind: number,idbd:number) {
		var x = document.getElementById("ykchild" + ind+idbd);
		//var a = document.getElementById("btnHideyk" + ind);
		//var b = document.getElementById("btnShowyk" + ind);
		if (!x.style.display || x.style.display === "none") {
			x.style.display = "block";
			//a.style.display = "block";
			//b.style.display = "none";
		} else {
			x.style.display = "none";
			//a.style.display = "none";
			//b.style.display = "block";
		}
		console.log('ind:',ind);
		return x.style.display;
	}
	




	// selectFile_PDF(ind) {
	// 	if (ind == -1) {
	// 		let f = document.getElementById("PDFInpdd");
	// 		f.click();
	// 	}
	// 	else {
	// 		let f = document.getElementById("PDFInpdd" + ind);
	// 		f.click();
	// 	}

	// }
	onSelectFile_PDF(event) {

		setTimeout(() => {
			
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
				console.log(this.image);
					this.changeDetectorRefs.detectChanges();
			  
				  }
				}
			
			  reader.readAsDataURL(filesAmount);
			}, 100);
			
		
			 } 
	
	
	
			 CloseIMG()
			 {
			   this.image=null;
			   this.nameimg=null;
			 
			 }

			
		  
		
		  
// pareseHtml_img(str)
// {	
// 	const result = `<img src="${str}" width="200" height="100">`;
// 	return result;
// }
	parseHtml(str) {
		var html = str;
		var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
		var reg1 = /\:[A-Za-z]\w*\:/gm
		var match = html.match(reg);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				var username = key.slice(1);
				if (this.accounts[key]) {
					// var re = `<span class="url inline-tag" data-username="${username}">${this.accounts[key]}</span>`;
					// html = html.replace(key, re);
				}
			}
		}
		match = html.match(reg1);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				if (this.emotions[key]) {
					// var re = `<img src="${this.emotions[key]}" />`;
					// html = html.replace(key, re);
				}
			}
		}
			// setTimeout(() => {
			// 	this.ngAfterViewInit();
			// }, 10)
		//return html;
		return this.sanitized.bypassSecurityTrustHtml(html)
	}
	
	remove(item, index, indexc = -1) {
		
	}

	
	//#region tag username
	getOptions() {
		var options: any = {
			showSearch: false,
			keyword: this.getKeyword(),
			data: this.listUser.filter(x => this.selected.findIndex(y => x.id_nv == y.id_nv) < 0),
		};
		return options;
	}
	getKeyword() {
		let i = this.CommentTemp.lastIndexOf('@');
		if (i >= 0) {
			let temp = this.CommentTemp.slice(i);
			if (temp.includes(' '))
				return '';
			return this.CommentTemp.slice(i);
		}
		return '';
	}
	list_rep:any[]=[];

	reply(id_u:number,index, indexc = -1)
	{ 
		
		this._service_cmt.TagName(id_u).subscribe(res=>{
				this.list_rep=res.Data;	
				this.dulieu_cmt_child="@"+this.list_rep[0].Username;
				this.changeDetectorRefs.detectChanges();

		})

	
	
	}

	// ItemSelected(data) {
	// 	this.selected.push(data);
	// 	let i = this.CommentTemp.lastIndexOf('@');
	// 	this.CommentTemp = this.CommentTemp.substr(0, i) + '@' + data.username + ' ';
	// 	this.myPopover.hide();
	// 	let ele = (<HTMLInputElement>this.matInput.nativeElement);
	// 	if (this.indexxxxx >= 0)
	// 		ele = (<HTMLInputElement>document.getElementById("CommentRep" + this.indexxxxx));
	// 	ele.value = this.CommentTemp;
	// 	ele.focus();
	// 	this.changeDetectorRefs.detectChanges();
	// }
	// click($event, vi = -1) {
	// 	this.myPopover.hide();
	// }
	// onSearchChange($event, vi = -1) {
	// 	if (vi >= 0)
	// 		this.CommentTemp = (<HTMLInputElement>document.getElementById("CommentRep" + vi)).value;
	// 	else
	// 		this.CommentTemp = this.Comment;
	// 	if (this.selected.length > 0) {
	// 		var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
	// 		var match = this.CommentTemp.match(reg);
	// 		if (match != null && match.length > 0) {
	// 			let arr = match.map(x => x);
	// 			this.selected = this.selected.filter(x => arr.includes('@' + x.username));
	// 		} else {
	// 			this.selected = [];
	// 		}
	// 	}
	// 	this.options = this.getOptions();
	// 	if (this.options.keyword) {
	// 		let el = $event.currentTarget;
	// 		let rect = el.getBoundingClientRect();
	// 		console.log(rect);
	// 		var w = this.textEl.nativeElement.offsetWidth + 25;
	// 		var h = 0;
	// 		this.myPopover.show();
	// 		this.myPopover.top = el.offsetTop + h;
	// 		this.myPopover.left = el.offsetLeft + w;
	// 		//this.myPopover.top = rect.y + h;
	// 		//this.myPopover.left = w ;
	// 		this.changeDetectorRefs.detectChanges();
	// 	}
	// }
// 	allpost:any[]=[];
//  notEmptyPost = true;
//  notscrolly = true;
//  loadInitPost() {
// 	// const url = 'https://localhost:44340/api/KhoaLuan/getDSBaiDang?id_user=1';
// 	// this.http.get(url).subscribe(data => {
// 	//   console.log('scroll',data);
// 	//   this.allpost = data[0];
// 	// });

// // 	this._services.getlistBaiDang(this.id_user).subscribe((res) => {
	
// // 		this.data= res.data;
// // 		for(let i=0;i<5;i++){
// // 			console.log('data scroll:',res.data[i])
// // 			this.allpost.push(res.data[i]);
// // 		}
	
		
// // 		console.log('scroll:',this.allpost)
// // 		 this.changeDetectorRefs.detectChanges();
// // })
//   }
//  onScroll() {
	
// 	 this.loadNextPost();
// 	}
// 	loadNextPost() {
// 		let k=5;
// 		this._services.getlistBaiDang(this.id_user).subscribe((res) => {
			
// 			this.data= res.data;
// 			for(let i=0;i<k;i++){
// 				console.log('data scroll:',res.data[i])
// 				this.allpost.push(res.data[i]);
				
// 			}
// 			 k+=5;
			
// 			console.log('scroll:',this.allpost)
// 			 this.changeDetectorRefs.detectChanges();
// 	})
// }
	getHeight(): any {
		let obj = window.location.href.split("/").find(x => x == "wework");
		if (obj) {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 197;
			return tmp_height + 'px';
		} else {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 140;
			return tmp_height + 'px';
		}
	}
	quickEdit(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}
	updateStage(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}

}
