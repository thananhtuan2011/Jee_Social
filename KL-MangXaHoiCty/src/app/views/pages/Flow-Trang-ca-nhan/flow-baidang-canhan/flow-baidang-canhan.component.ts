

import { AuthService } from './../../../../core/auth/_services/auth.service';


// import { CommentEditDialogComponent } from './../comment/comment-edit-dialog/comment-edit-dialog.component';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TokenStorage } from '../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud/utils/layout-utils.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LeavePersonalCBCCModel }from '../../../../core/auth/_models/typepost.model';


import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { concatMap, delay, first } from 'rxjs/operators';

import { BaiDangService } from '../../home/Bai-Dang/_Services/bai-dang.service';
import { UploadfileService } from '../../home/Bai-Dang/_Services/uploadfile.service';
import { TranslateService } from '@ngx-translate/core';
import { CommentService } from '../../home/Bai-Dang/_Services/comment.service';
import { ThongbaoService } from '../../home/Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from '../../home/Bai-Dang/Model/ThongBao.model';
import { TypePostComponent } from '../../home/type-post/type-post.component';
import { CommentModel } from '../../home/Bai-Dang/Model/comment.model';
import { ImageModel } from '../../home/Bai-Dang/Model/Img.model';
import { CommentEditDialogComponent } from '../../home/Comment/comment-edit-dialog/comment-edit-dialog.component';
import { BaidangEditComponent } from '../../home/Bai-Dang/baidang-edit/baidang-edit.component';
import { BaiDangModel } from '../../home/Bai-Dang/Model/Bai-dang.model';
import { DeXuatEditComponent } from '../../home/Bai-Dang/de-xuat-edit/de-xuat-edit.component';
import { TinNhanhEditComponent } from '../../home/Bai-Dang/tin-nhanh-edit/tin-nhanh-edit.component';
import { ChaoDonThanhvienEditComponent } from '../../home/Bai-Dang/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from '../../home/Bai-Dang/khen-thuong-edit/khen-thuong-edit.component';
import { ActivatedRoute } from '@angular/router';
import { TrangCaNhanService } from '../../home/trang-ca-nhan/trang-ca-nhan.service';
import { FlowCaNhanService } from '../flow-ca-nhan.service';



@Component({
  selector: 'kt-flow-baidang-canhan',
  templateUrl: './flow-baidang-canhan.component.html',
  styleUrls: ['./flow-baidang-canhan.component.scss']
})
export class FlowBaidangCanhanComponent implements OnInit {
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
  listTrangCaNhan:any[]=[];
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
  listDataEdit:any[]=[];
  @Input() id_user_canhan: any;
  image: any;
	ListMedia:any[]=[];
  dulieu_cmt_child:string=''
  @Input() ID_QuyTrinh: any;
  listKhenThuong:any[] = [];

  listTT_user:any[] = [];
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private route:ActivatedRoute,
    public _services_canhan: TrangCaNhanService,
    public _services_Flowcanhan: FlowCaNhanService,
     public _services: BaiDangService,
    private _service_cmt:CommentService,
    private sanitized: DomSanitizer,
	public dialog: MatDialog,
	private tokenStore:TokenStorage,
	private layoutUtilsService: LayoutUtilsService,
	private translate: TranslateService,
	private _service_thongbao:ThongbaoService,
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
 






	
Item_thongbao(): ThongBaoModel {
    const item = new ThongBaoModel();
  

		 item.title="Đã  bình luận một bài viết :";
		 item.id_cmt=1;
        item.create_tb_by=this.id_user;
    
    this.changeDetectorRefs.detectChanges();
    return item;
  }

 
  
  AddThongbao(item:ThongBaoModel,withBack:boolean){
  
      this._service_thongbao.InsertThongBao(item).subscribe(res=>{
        if (res && res.status === 1) {
         
         
          // this.dialogRef.close();
         
          
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  
        ThongBaotInsert()
        {
  
          let it_cmt=this.Item_thongbao();
           this.AddThongbao(it_cmt,false);
        
          
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


			CommentInsert()
			{

				let it_cmt=this.Item_cmt();
				this.AddComment(it_cmt,false);
				if(this.nameimg!=null ||this.nameimg!=" ")
				{
				  this.insert_file();
				}
			//	this.ThongBaotInsert();
			}


			Item_cmt_child(id_cmt:number): CommentModel {
				
				const item = new CommentModel();
			
						item.ID_BaiDang=null;
						item.NoiDung_cmt=this.dulieu_cmt_child;
						item.id_cmt_parent=id_cmt;
						item.typepost=1;
						// item.CreatedDate
						item.CreatedBy=this.id_user;
						item.UpdatedDate=null;
						item.UpdatedBy=null;
				
				this.changeDetectorRefs.detectChanges();
				return item;
			}
			
			
AddComment_Child(item:CommentModel,withBack:boolean){

	this._service_cmt.InsertComment_Child(item).subscribe(res=>{
		if (res && res.status === 1) {
			this.dulieu_cmt.setValue("");
			
			// this.dialogRef.close();
		   //  this.dataSource.loadListBaiDang();
			
				 }
				 else {
					 this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
				 }
	})
}


			CommentInsert_chill(ID_:number)
			{		
				let it_cmt=this.Item_cmt_child(ID_);
				this.AddComment_Child(it_cmt,false);
				this.dulieu_cmt_child='';
				
			//	this.ThongBaotInsert();
				 this.loadDataList();
			}




		// xóa cmt
			deleteComment(id:number)
			{
				
				
					this.changeDetectorRefs.detectChanges();
				this._service_cmt.DeleteComnent(id).subscribe(res => {
					this.loadDataList();
					this.changeDetectorRefs.detectChanges();
				})
				
			}
			// id_cmt:number,noidung:string, id_user:number
			// update comment
			Update_Comment(item,index,indexc=-1) {
				var data = Object.assign({}, item);
				// var data = Object.assign({}, item);
				const dialogRef = this.dialog.open(CommentEditDialogComponent, { data:data,
					
					width: '500px' });
				dialogRef.afterClosed().subscribe(res => {
					if (res) {
						item.comment = res.comment
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
			// xóa cmt trong bài đăng đó để xóa bài đăng


			Update_Comment_Child(item,index,indexc=-1) {
				var data = Object.assign({}, item);
				// var data = Object.assign({}, item);
				const dialogRef = this.dialog.open(CommentEditDialogComponent, { data:data,
					
					width: '500px' });
				dialogRef.afterClosed().subscribe(res => {
					if (res) {
						item.comment = res.comment
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
			// xóa like trong cmt
		
		// delete_cmt_BaiDang(id_baidang:number)
		// {
		
		
		// 	this._services.Delete_cmt_Baidang(id_baidang).subscribe(res => {
			
		// 	})
		// 	this.changeDetectorRefs.detectChanges();
			

		
		// }

		Item_thongbao_like_cmt(id_cmt:number): ThongBaoModel {
			const item = new ThongBaoModel();
	
		
				 item.title="Đã bày tỏ cảm xúc về một bình luận của bạn ";
				 item.id_cmt=id_cmt;
				item.create_tb_by=this.id_user;
			
			this.changeDetectorRefs.detectChanges();
			return item;
		  }
		
		 
		  
		  AddThongbao_like_cmt(id_cmt:number,id_baidang:number,item:ThongBaoModel,withBack:boolean){
			
			  this._service_thongbao.InsertThongBao_like(id_cmt,id_baidang,item).subscribe(res=>{
				if (res && res.status === 1) {
				
				 
				  // this.dialogRef.close();
				 
				  
					 }
					 else {
					   this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
					 }
			  })
		  }
		  
				ThongBaotInsert_like_cmt(id_cmt:number)
				{
					
		  
				  let it_cmt=this.Item_thongbao_like_cmt(id_cmt);
				   this.AddThongbao_like_cmt(id_cmt,0,it_cmt,false);
				
				  
				}

		like_cmt(id_cmt:number,type:number)
		{
			this._service_cmt.like_cmt(id_cmt,type).subscribe(res =>{
			
				if (res) {
				//	this.ThongBaotInsert_like_cmt(id_cmt);
					this.loadDataList();
					
					this.changeDetectorRefs.detectChanges();
				}
				else
				{
					this.loadDataList();
					this.changeDetectorRefs.detectChanges();
				}
			})

			
		}



	delete_cmt_BaiDang(id_baidang:number)
		{
		
			
			this._services.Delete_cmt_Baidang(id_baidang).subscribe(res => {
			
			})
			this.changeDetectorRefs.detectChanges();
			

		
		}
		

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
	
		this.delete_cmt_BaiDang(id_baidang)

		
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

	

		 delete_like_BaiDang(id_baidang:number)
		 {
		 
		 
			 this._services.Delete_like_Baidang(id_baidang).subscribe(res => {
			 
			 })
			 this.changeDetectorRefs.detectChanges();
			 
	
		 
		 }
		 
		 UpdateBaiDang_CKeditor(id_:number) {
			 
			//debugger
			this.getDataEditBaiDang(id_);
				setTimeout(() => {
					
			
			this.item=( this.listDataEdit.find(x => x.Id_BaiDang ==id_));
		
				
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
		}, 500);
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
				getDataEditBaiDang( id_:number)

				{
						this._services_canhan.getdataEdit(id_).subscribe(res=>{
						
								this.listDataEdit=res.Data;
								
								this.changeDetectorRefs.detectChanges();
						})
				}
				UpdateBaiDang_2(id_:number) {
						this.getDataEditBaiDang(id_);
						setTimeout(() => {
							
					
						this.item=this.listDataEdit.find(x => x.Id_BaiDang ==id_)
						
					// this.item=( <any>this.data).DataBaiDang.find(x => x.Id_BaiDang ==id_);
				
						
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
				}, 500);
				}
	
				Item_thongbao_like_baidang(): ThongBaoModel {
					const item = new ThongBaoModel();
				
						 item.title="Đã bày tỏ cảm xúc bài viết của bạn";
						 item.id_bd=1;
						item.create_tb_by=this.id_user;
					
					this.changeDetectorRefs.detectChanges();
					return item;
				  }
				
				 
				  
				  AddThongbao_like_baidang(id_cmt:number,id_baidang:number,item:ThongBaoModel,withBack:boolean){
				  
					  this._service_thongbao.InsertThongBao_like(id_cmt,id_baidang,item).subscribe(res=>{
						if (res && res.status === 1) {
						 
						 
						  // this.dialogRef.close();
						 
						  
							 }
							 else {
							   this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
							 }
					  })
				  }
				  
						ThongBaotInsert_like_baidang(id_baidang:number)
						{
				  
						  let it_cmt=this.Item_thongbao_like_baidang();
						  this.AddThongbao_like_cmt(0,id_baidang,it_cmt,false);
						
						  
						}

		like(id:number,type:number) {
			//debugger
			this._services.like(id,type).subscribe(res => {
				if (res && res.status == 1) {
					// item.Like = res.data.Like;
					// item.Likes = res.data.Likes;
				//	this.ThongBaotInsert_like_baidang(id);
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

	this._services_Flowcanhan.getBaiDangFlowTrangCaNhan(this.id_user_canhan).subscribe((res) => {
					
			this.data= res.data;
		
			console.log('data bài đăng cá nhân',this.data);
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

		  this.listTT_user=res.data;
		  this.changeDetectorRefs.detectChanges();
		 
	  })
  }

  LoadTrangCaNhan()
  {
	this._services_Flowcanhan.getTrangCaNhanFlow(this.id_user_canhan).subscribe(res=>{
        this.listTrangCaNhan=res.data;
        this.changeDetectorRefs.detectChanges();
      })
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
    
      this.id_user_canhan =+params.id_canhan;
	this.GetCurrentUser();
    this.LoadData();
    this.LoadTrangCaNhan();
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
});
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


	XoaBaiDangCaNhan(idbd_canhan:number)

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
	
				this._services_canhan.DeleteBaiDangCaNhan(idbd_canhan).subscribe(res => {
					this.loadDataList();

				});
			});
		 
	}

}
