import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { BaiDangService } from './../_Services/bai-dang.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { CommentService } from '../_Services/comment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommentModel } from '../Model/comment.model';
import { CommentEditDialogComponent } from '../../Comment/comment-edit-dialog/comment-edit-dialog.component';
import { BaiDangModel } from '../Model/Bai-dang.model';
import { BaidangEditComponent } from '../baidang-edit/baidang-edit.component';
import { TinNhanhEditComponent } from '../tin-nhanh-edit/tin-nhanh-edit.component';
import { DeXuatEditComponent } from '../de-xuat-edit/de-xuat-edit.component';
import { ChaoDonThanhvienEditComponent } from '../chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from '../khen-thuong-edit/khen-thuong-edit.component';
import { TypePostComponent } from '../../type-post/type-post.component';
import { MediaService } from '../../media/media.service';
import { MediaComponent } from '../../media/media.component';
import { ThongBaoModel } from '../Model/ThongBao.model';
import { ThongbaoService } from '../_Services/thongbao.service';


@Component({
  selector: 'kt-detail-baidang-comment',
  templateUrl: './detail-baidang-comment.component.html',
  styleUrls: ['./detail-baidang-comment.component.scss']
})
export class DetailBaidangCommentComponent implements OnInit {

  item_11:any[]=[];
  data: any[] = [];
  listTT_user:any[]=[];
 
  @Input() id_cmt: any;
  id_user:number;
  list_detail:any[]=[];




  cmt:any[]=[];
  // dataSource: BaiDangDataSource;
  @ViewChild("keyword", { static: true }) keyword: ElementRef;
  
	// listResult = new Subject();
	example: string = `<div>this is another div <br/> Đây là inser</div>`
	// Public properties
	ItemData: any = {};
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
	list_rep:any[]=[];
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

  id_bd_cmt:number;
	item:any;
  dulieu_cmt = new FormControl('');
  edit_dulieu_cmt=new FormControl('');

  dulieu_cmt_child:string=''
  @Input() ID_QuyTrinh: any;
  listKhenThuong:any[] = [];
  ListMedia:any[]=[];
  constructor(

    private route:ActivatedRoute,
    private tokenStore:TokenStorage,
    private _services:BaiDangService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service_thongbao:ThongbaoService,
    private _service_cmt:CommentService,
    private sanitized: DomSanitizer,
	public dialog: MatDialog,
	private auth:AuthService,
	private _services_media:MediaService,
	private layoutUtilsService: LayoutUtilsService,
	private translate: TranslateService,
  

  ) { }


  

	
	addLeave() {
	
		const dialogRef = this.dialog.open(TypePostComponent,{
		  data:{  },
		  panelClass:'no-padding'
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


// test(){
// 	this.datainput.push({ data:""});
// 	console.log('Data',this.datainput)
// }

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

			CommentInsert()
			{

				let it_cmt=this.Item_cmt();
				this.AddComment(it_cmt,false);


				this.ThongBaotInsert();
			
				
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
			this.loadDataList();
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
		
		delete_cmt_BaiDang(id_baidang:number)
		{
		
			//this.deleteComment(id_cmt)
			this._services.Delete_cmt_Baidang(id_baidang).subscribe(res => {
			
			})
			this.changeDetectorRefs.detectChanges();
			
		//	this.loadDataList();
		
		}
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
					
					this.loadDataList();
					//this.ThongBaotInsert_like_cmt(id_cmt)
					this.changeDetectorRefs.detectChanges();
				}
				else
				{
					this.loadDataList();
					this.changeDetectorRefs.detectChanges();
				}
			})

			
		}



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
		this.delete_cmt_BaiDang(id_baidang)
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
					
					// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
					this.changeDetectorRefs.detectChanges();
				}
				else
				{
				
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
							
							this.changeDetectorRefs.detectChanges();
						}
						else
						{
						
							this.changeDetectorRefs.detectChanges();
						}
					});
				}

				Update_BAIDANG_7(item,index,indexc=-1) {
					//	debugger
						var data = Object.assign({}, item);
						// var data = Object.assign({}, item);
						const dialogRef = this.dialog.open(DeXuatEditComponent, { data:data,
							
							width: '500px' });
						dialogRef.afterClosed().subscribe(res => {
							if (res) {
								item.dexuat = res.dexuat
								
								this.changeDetectorRefs.detectChanges();
							}
							else
							{
							
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
				   // saveMessageTranslateParam += _item. > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
				   // const _saveMessage = this.translate.instant(saveMessageTranslateParam);
				   // const _messageType = _item.id_row > 0 ? MessageType.Update : MessageType.Create;
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


	this._services.getDetailComment(this.id_user,this.id_cmt).subscribe((res) => {
	
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




  Noti() {
	 
	this.layoutUtilsService.showInfo("Bài viết không tồn tại ! ");
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

  LoadMedia()
{
		this._services_media.getlistMedia().subscribe(res=>{
			this.ListMedia=res.Data;
			this.changeDetectorRefs.detectChanges();
			console.log('Media',this.ListMedia);
		})
}
	
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
  //  this.loadcmt();
	this.loadTTuser();
	this.LoadMedia();
  this.route.params.subscribe(params => {
	debugger
	this.id_cmt =+params.id;
	this.loadDataList();
	this.changeDetectorRefs.detectChanges();
	
  });
  this.loadDataList();


// this.loadListDetail_BaiDang();

  
  }



	getDSYKien_Interval() {
		//this.NguoiNhan='';
		var NguoiNhan_Tam = '';
		this._service_cmt.getDSComment(1,1).subscribe(res => {
			if (res && res.status == 1) {
				let data: any = res.data;

				for (var j = 0; j < data.length; j++) {
					let check: boolean = false;
					for (var i = 0; i < this.ListYKien.length; i++) {
						if (data[j].IdRow == this.ListYKien[i].IdRow) {
							check = true;
							this.ListYKien[i].CreatedDate = data[j].CreatedDate;
							this.ListYKien[i].comment = data[j].comment;
							this.ListYKien[i].NguoiTao.hoten = data[j].NguoiTao.hoten;
							this.ListYKien[i].NguoiTao.image = data[j].NguoiTao.image;
							this.ListYKien[i].Attachments = data[j].Attachment;

							for (var a = 0; a < this.ListYKien[i].NguoiNhans.length; a++) {
								NguoiNhan_Tam += this.ListYKien[i].NguoiNhans[a].NguoiTao.hoten + '\n';
							}
							this.NguoiNhan = NguoiNhan_Tam;
							this.Children_Interval(data[j].Children, this.ListYKien[i].Children);
						}
					}
					if (!check) {
						this.ListYKien.push(data[j]);
					}
				}
				this.changeDetectorRefs.detectChanges();
			}
		});
	}

	Children_Interval(data: any, children: any) {
		for (var j = 0; j < data.length; j++) {
			let check: boolean = false;
			for (var i = 0; i < children.length; i++) {
				if (data[j].IdRow == children[i].IdRow) {
					check = true;
					children[i].CreatedDate = data[j].CreatedDate;
					children[i].comment = data[j].comment;
					children[i].NguoiTao.hoten = data[j].NguoiTao.hoten;
					children[i].NguoiTao.image = data[j].NguoiTao.image;
					children[i].Attachments = data[j].Attachment;
					this.changeDetectorRefs.detectChanges();
				}
			}
			if (!check) {
				children.push(data[j]);
				this.ListAttachFile.push([])
			}
		}
	}


	CheckedChange(p: any, e: any) {
		p.check = e;
	}


	DateChanged(value: any, ind: number) {
		if (ind == 1) {
			let batdau = value.targetElement.value.replace(/-/g, '/').split('T')[0].split('/');
			if (+batdau[0] < 10 && batdau[0].length < 2)
				batdau[0] = '0' + batdau[0];
			if (+batdau[1] < 10 && batdau[1].length < 2)
				batdau[1] = '0' + batdau[1];

			this.FormControls.controls['bDNghi'].setValue(batdau[2] + '-' + batdau[1] + '-' + batdau[0]);
		}
		if (ind == 2) {
			let ketthuc = value.targetElement.value.replace(/-/g, '/').split('T')[0].split('/');
			if (+ketthuc[0] < 10 && ketthuc[0].length < 2)
				ketthuc[0] = '0' + ketthuc[0];
			if (+ketthuc[1] < 10 && ketthuc[1].length < 2)
				ketthuc[1] = '0' + ketthuc[1];

			this.FormControls.controls['kTNghi'].setValue(ketthuc[2] + '-' + ketthuc[1] + '-' + ketthuc[0]);
		}
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
		// this.FormControls = this.FormControlFB.group({
		// });

		// for (var i = 0; i < this.ListYKien.length; i++) {
		// 	//this.itemForm.addControl(this.Listbiuldview[i].BuildEditor, new FormControl('', Validators.required));
		// 	this.FormControls.addControl("FctAttachFile" + i, new FormControl([{filename:'Khoatest.docx',StrBase64:'1234553543534'}]));
		// }


		for (var i = 0; i < this.ListYKien.length; i++) {
			this.ListAttachFile.push([])
			//{filename:'Khoatest.docx',StrBase64:'1234553543534'}
			//this.ListAttachFile['FctAttachFile'+i]={filename:'Khoatest.docx',StrBase64:'1234553543534'};
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
	




	selectFile_PDF(ind) {
		if (ind == -1) {
			let f = document.getElementById("PDFInpdd");
			f.click();
		}
		else {
			let f = document.getElementById("PDFInpdd" + ind);
			f.click();
		}

	}
	
	clickOnUser = (event) => {
		// Prevent opening anchors the default way
		event.preventDefault();
		event.stopPropagation();
		const anchor = event.target as HTMLAnchorElement;

		this.it = this.listUser.find(x => x.username == anchor.getAttribute('data-username'));
		this.changeDetectorRefs.detectChanges();
		console.log('on user');
		this.myPopoverU.show();
		//let el = event.parentElement;
		//this.myPopoverU.top = el.offsetTop;
		//this.myPopoverU.left = el.offsetLeft;
	}
	clickonbox($event) {
		console.log('on box');
		this.myPopoverU.hide();
	}

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
	// like(item, icon) {
	// 	this.service.like(item.id_row, icon).subscribe(res => {
	// 		if (res && res.status == 1) {
	// 			item.Like = res.data.Like;
	// 			item.Likes = res.data.Likes;
	// 			this.changeDetectorRefs.detectChanges();
	// 		}
	// 	})
	// }
	remove(item, index, indexc = -1) {
		// this.service.remove(item.id_row).subscribe(res => {
		// 	if (res && res.status == 1) {
		// 		if (indexc >= 0)//xoa con
		// 			this.ListYKien[index].Children.splice(indexc, 1);
		// 		else
		// 			this.ListYKien.splice(index, 1);
		// 		this.changeDetectorRefs.detectChanges();
		// 	}
		// })
	}

	// initUpdate(item, index, indexc = -1) {
	// 	var data = Object.assign({}, item);
	// 	const dialogRef = this.dialog.open(CommentEditDialogComponent, { data: data, width: '500px' });
	// 	dialogRef.afterClosed().subscribe(res => {
	// 		if (res) {
	// 			item.comment = res.comment
	// 			this.changeDetectorRefs.detectChanges();
	// 		}
	// 	});
	// }
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
	ItemSelected(data) {
		this.selected.push(data);
		let i = this.CommentTemp.lastIndexOf('@');
		this.CommentTemp = this.CommentTemp.substr(0, i) + '@' + data.username + ' ';
		this.myPopover.hide();
		let ele = (<HTMLInputElement>this.matInput.nativeElement);
		if (this.indexxxxx >= 0)
			ele = (<HTMLInputElement>document.getElementById("CommentRep" + this.indexxxxx));
		ele.value = this.CommentTemp;
		ele.focus();
		this.changeDetectorRefs.detectChanges();
	}
	click($event, vi = -1) {
		this.myPopover.hide();
	}
	onSearchChange($event, vi = -1) {
		if (vi >= 0)
			this.CommentTemp = (<HTMLInputElement>document.getElementById("CommentRep" + vi)).value;
		else
			this.CommentTemp = this.Comment;
		if (this.selected.length > 0) {
			var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
			var match = this.CommentTemp.match(reg);
			if (match != null && match.length > 0) {
				let arr = match.map(x => x);
				this.selected = this.selected.filter(x => arr.includes('@' + x.username));
			} else {
				this.selected = [];
			}
		}
		this.options = this.getOptions();
		if (this.options.keyword) {
			let el = $event.currentTarget;
			let rect = el.getBoundingClientRect();
			console.log(rect);
			var w = this.textEl.nativeElement.offsetWidth + 25;
			var h = 0;
			this.myPopover.show();
			this.myPopover.top = el.offsetTop + h;
			this.myPopover.left = el.offsetLeft + w;
			//this.myPopover.top = rect.y + h;
			//this.myPopover.left = w ;
			this.changeDetectorRefs.detectChanges();
		}
  }
  reply(id_u:number,index, indexc = -1)
  { 
	  
	  this._service_cmt.TagName(id_u).subscribe(res=>{
			  this.list_rep=res.Data;	
			  this.dulieu_cmt_child="@"+this.list_rep[0].Username;
			  this.changeDetectorRefs.detectChanges();

	  })

	}
  
  

}
