import { QueryParamsModelNew, QueryParamsModelNewLazy } from './../../../../core/_base/crud/models/query-models/query-params.model';
import { TrangCaNhanService } from './../trang-ca-nhan/trang-ca-nhan.service';
import { MediaModel } from './../Bai-Dang/Model/media.model';

import { AuthService } from './../../../../core/auth/_services/auth.service';
import { UploadfileService } from './../Bai-Dang/_Services/uploadfile.service';
import { ThongBaoModel } from './../Bai-Dang/Model/ThongBao.model';
import { ThongbaoService } from './../Bai-Dang/_Services/thongbao.service';
import { KhenThuongEditComponent } from './../Bai-Dang/khen-thuong-edit/khen-thuong-edit.component';
import { ChaoDonThanhvienEditComponent } from './../Bai-Dang/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { TinNhanhEditComponent } from './../Bai-Dang/tin-nhanh-edit/tin-nhanh-edit.component';
import { CommentEditDialogComponent } from './../Comment/comment-edit-dialog/comment-edit-dialog.component';
import { CommentService } from './../Bai-Dang/_Services/comment.service';
import { BaidangEditComponent } from './../Bai-Dang/baidang-edit/baidang-edit.component';
// import { CommentEditDialogComponent } from './../comment/comment-edit-dialog/comment-edit-dialog.component';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TokenStorage } from '../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from '../../../../core/_base/crud/utils/layout-utils.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LeavePersonalCBCCModel }from '../../../../core/auth/_models/typepost.model';
import { TranslateService } from '@ngx-translate/core';
import { TypePostComponent } from '../type-post/type-post.component';
import { BaiDangService } from '../Bai-Dang/_Services/bai-dang.service';
import { BaiDangModel } from '../Bai-Dang/Model/Bai-dang.model';
import { CommentModel } from '../Bai-Dang/Model/comment.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DeXuatEditComponent } from '../Bai-Dang/de-xuat-edit/de-xuat-edit.component';
import { MediaComponent } from '../media/media.component';
import { MediaService } from '../media/media.service';
import { MediaDetailComponent } from '../media/media-detail/media-detail.component';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, first } from 'rxjs/operators';
import { ImageModel } from '../Bai-Dang/Model/Img.model';
// src\app\core\auth\_models\typepost.model.ts
@Component({
  selector: 'kt-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.scss'],
})
export class ContentHomeComponent implements OnInit {
  item_11:any[]=[];
  data :any[]=[];
  datalayzy:any[]=[];
 
 
//  data: any[] = [];
  filter: any = {};
  cmt:any[]=[];
  // dataSource: BaiDangDataSource;
  @ViewChild("keyword", { static: true }) keyword: ElementRef;
	list_baidang:any[]=[];
	list_layzy_baidang:any[]=[];
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
	private _service_thongbao:ThongbaoService,
	private _service_file:UploadfileService,
	private auth:AuthService,
	private _services_media:MediaService,
	private http: HttpClient,
	private _services_canhan:TrangCaNhanService,
  ) { }



// height: number = 300;
// onScroll($event) {
// 	let _scroll = 300;
// 	let _height = _scroll + $event.currentTarget.scrollTop;
// 	this.height = _height;
// }


//  @HostListener('window:scroll', ['$event']) 
 




LoadMedia()
{
		this._services_media.getlistMedia().subscribe(res=>{
			this.ListMedia=res.data;
			this.changeDetectorRefs.detectChanges();
			console.log('Media',this.ListMedia);
		})
}

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
  

		 item.title="Đã  bình luận một bài viết : ";
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

AddComment(item:CommentModel,withBack:boolean,id_baidang:number){
		this._service_cmt.InsertComnent(item).subscribe(res=>{
			if (res && res.status === 1) {
				this.dulieu_cmt.setValue("");
				console.log(res.data);
				let index=this.list_baidang.findIndex(x=>x.Id_BaiDang===id_baidang)
			
				// this.loadDataList();
				this.list_baidang[index].Coment.push(res.data[0]);
		
				// this.dialogRef.close();
			   //  this.dataSource.loadListBaiDang();
				
					 }
					 else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
					 }
					 this.changeDetectorRefs.detectChanges();
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


			CommentInsert(id:number)
			{
			
				let it_cmt=this.Item_cmt();
				this.AddComment(it_cmt,false,id);
				if(this.nameimg!=null ||this.nameimg!=" ")
				{
				  this.insert_file();
				}
				//this.ThongBaotInsert();
			}


			Item_cmt_child(id_cmt:number): CommentModel {
				
				const item = new CommentModel();
			
					
						item.NoiDung_cmt=this.dulieu_cmt_child;
						item.id_cmt_parent=id_cmt;
						item.typepost=1;
						// item.CreatedDate
					
				
				this.changeDetectorRefs.detectChanges();
				return item;
			}
			
			
AddComment_Child(item:CommentModel,withBack:boolean){

	this._service_cmt.InsertComment_Child(item).subscribe(res=>{
		if (res && res.status === 1) {
			this.dulieu_cmt.setValue("");

			let vitribd;
			let vitricmt;
			let vitricmt_child;
	
				for(let j=0;j<this.list_baidang.length;j++)
				{
					
						let index=this.list_baidang[j].Coment.findIndex(x=>x.id_cmt===item.id_cmt_parent);
						if(index>=0)
						{
							vitribd=j;
							vitricmt=index;
							
							this.list_baidang[vitribd].Coment[vitricmt].Comment_child.push(res.data[0]);
						
							this.changeDetectorRefs.detectChanges();
						}
						

					
					}
				}
			
	})
}


			CommentInsert_chill(ID_:number)
			{		
				let it_cmt=this.Item_cmt_child(ID_);
				this.AddComment_Child(it_cmt,false);
				this.dulieu_cmt_child='';
				
			//	this.ThongBaotInsert();
				//  this.loadDataList();
			}



		

		// xóa cmt
			deleteComment(id:number)
			{
				
					
					this.changeDetectorRefs.detectChanges();
					let vitribd;
					let vitricmt;
				this._service_cmt.DeleteComnent(id).subscribe(res => {
					for(let j=0;j<this.list_baidang.length;j++)
					{
						
							let index=this.list_baidang[j].Coment.findIndex(x=>x.id_cmt===id);
							if(index>=0)
							{
								vitribd=j;
								vitricmt=index;
								this.list_baidang[vitribd].Coment.splice(vitricmt,1);
							
								this.changeDetectorRefs.detectChanges();
							}
							
						
	
						
						}
					
				})
				
			}

			deleteComment_child(id:number)
			{
				
				
					this.changeDetectorRefs.detectChanges();
					let vitribd;
					let vitricmt;
				this._service_cmt.DeleteComnent(id).subscribe(res => {
					for(let j=0;j<this.list_baidang.length;j++)
					{
						for(let i = 0; i<this.list_baidang[j].Coment.length; i++)
						{
							
								
							let index=this.list_baidang[j].Coment[i].Comment_child.findIndex(x=>x.id_cmt===id);
							
							if(index>=0)
							{
							
								vitribd=j;
								vitricmt=i
								this.list_baidang[j].Coment[i].Comment_child.splice(index,1);
							}
						}
						
	
						
						}
					
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
						
						let vitribd;
						let vitricmt;
						for(let j=0;j<this.list_baidang.length;j++)
					{
						
							let index=this.list_baidang[j].Coment.findIndex(x=>x.id_cmt===item.id_cmt);
							if(index>=0)
							{
								vitribd=j;
								vitricmt=index;
								var tam = Object.assign({}, res[0]);
								this.list_baidang[vitribd].Coment.splice(vitricmt,1,tam);

							
							
								this.changeDetectorRefs.detectChanges();
							}
							
							
						
	
						
						}
						
					}
					else
					{
					
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
					
							let vitribd;
							let vitricmt;
						for(let j=0;j<this.list_baidang.length;j++)
					{
						

						let index_tam=this.list_baidang[j].Coment.findIndex(x=>x.id_cmt===res[0].id_cmt_parent);
						if(index_tam>=0)
						{
							vitribd=j;
							vitricmt=index_tam;
							
							this.list_baidang[vitribd].Coment[vitricmt].Comment_child.splice(index,1,res[0]);
						
							this.changeDetectorRefs.detectChanges();
						}
					
						}
						
					}
					else
					{
						
						this.changeDetectorRefs.detectChanges();
					}
				});
			}
			// xóa like trong cmt
		
		delete_cmt_BaiDang(id_baidang:number)
		{
		
			
			this._services.Delete_cmt_Baidang(id_baidang).subscribe(res => {
			
			})
			this.changeDetectorRefs.detectChanges();
			

		
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
// like comment child
				like_cmt_child(id_cmt:number,type:number)
				{
					let vitribd;
					let vitricmt;
					let vitricmt_child;
				this._service_cmt.like_cmt_child(id_cmt,type).subscribe(res =>{
				
					if (res) {
						console.log('commt child',res);
						for(let j=0;j<this.list_baidang.length;j++)
						{
							for(let i = 0; i<this.list_baidang[j].Coment.length; i++)
							{
								
								let index=this.list_baidang[j].Coment[i].Comment_child.findIndex(x=>x.id_cmt===id_cmt);
								
								if(index>=0)
								{
								
									vitribd=j;
									vitricmt=i
									vitricmt_child=index;
									// this.list_baidang[j].Coment[i].Comment_child[vitricmt_child].push(res.data[0]);
									// this.changeDetectorRefs.detectChanges();
								
							
								}
								
							
							}
						}
						// console.log('vitri bd',vitribd)
						// 		console.log('vitri cmt',vitricmt)
							
						// 		console.log('id cmt',id_cmt)
						if(this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child===null)
						{
							this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child=Object.assign(res.data[0].Like_child);
						}
						else
	
						{
						
						
							if(type===0)
							{
								//delete this.list_baidang[index].Like;
								this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child=null;
							}
							else
	
							{
								delete this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child;
								this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child = Object.assign(res.data[0].Like_child);
							}
							
							
						
						}
						if(this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child===null)
						{
							//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
							this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=res.data[0].Like_Comment_child.slice();
						}
						else
	
						{
							// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);
	
							this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=null;
							if(res.data[0].Like_Comment_child.length>0)
							{
								// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
								this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=res.data[0].Like_Comment_child.slice();
							}
							else
	
							{
								this.list_baidang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=[];
							}
							
						}
					
						
						this.changeDetectorRefs.detectChanges();
					}
					else
					{
						
						this.changeDetectorRefs.detectChanges();
					}
				})
	
				}
// like comment
		like_cmt(id_cmt:number,type:number)
		{
		
				let vitribd;
				let vitricmt;
			this._service_cmt.like_cmt(id_cmt,type).subscribe(res =>{
			
				if (res) {
					for(let j=0;j<this.list_baidang.length;j++)
					{
						for(let i = 0; i<this.list_baidang[j].Coment.length; i++)
						{
							let index=this.list_baidang[j].Coment.findIndex(x=>x.id_cmt===id_cmt);
							if(index>=0)
							{
								vitribd=j;
								vitricmt=index;
							}
						
						}
					}
					
					
					
					if(this.list_baidang[vitribd].Coment[vitricmt].Like===null)
					{
						this.list_baidang[vitribd].Coment[vitricmt].Like=Object.assign(res.data[0].Like);
					}
					else

					{
					
					
						if(type===0)
						{
							//delete this.list_baidang[index].Like;
							this.list_baidang[vitribd].Coment[vitricmt].Like=null;
						}
						else

						{
							delete this.list_baidang[vitribd].Coment[vitricmt].Like;
							this.list_baidang[vitribd].Coment[vitricmt].Like = Object.assign(res.data[0].Like);
						}
						
						
					
					}
					if(this.list_baidang[vitribd].Coment[vitricmt].Like_Comment===null)
					{
						//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
						this.list_baidang[vitribd].Coment[vitricmt].Like_Comment=res.data[0].Like_Comment.slice();
					}
					else

					{
						// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);

						this.list_baidang[vitribd].Coment[vitricmt].Like_Comment=null;
						if(res.data[0].Like_Comment.length>0)
						{
							// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
							this.list_baidang[vitribd].Coment[vitricmt].Like_Comment=res.data[0].Like_Comment.slice();
						}
						else

						{
							this.list_baidang[vitribd].Coment[vitricmt].Like_Comment=[];
						}
						
					}
					
				
					
					this.changeDetectorRefs.detectChanges();
				}
				else
				{
					
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
				//	this.loadDataList();
				let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==id_baidang);
				this.list_baidang.splice(vi, 1);
				this.changeDetectorRefs.detectChanges();

						
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
		 
		 UpdateBaiDang_CKeditor(id_:number,index, indexc = -1) {
			 
			//debugger
			this.item=( this.list_baidang.find(x => x.Id_BaiDang ==id_));
		
				
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
					var tam=Object.assign(res[0]);
					// let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==item.Id_BaiDang);
					this.list_baidang.splice(index, 1,tam);
					this.changeDetectorRefs.detectChanges();
					// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
				}
				else
				{
					var tam=Object.assign(res[0]);
					// let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==item.Id_BaiDang);
					this.list_baidang.splice(index, 1,tam);
					this.changeDetectorRefs.detectChanges();
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
							// this.loadDataList();
							var tam=Object.assign(res[0]);
							// let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==item.Id_BaiDang);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
							
						}
						else
						{
							var tam=Object.assign(res[0]);
							this.list_baidang.splice(index, 1,tam);
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
								var tam=Object.assign(res[0]);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
							
							}
							else
							{
								var tam=Object.assign(res[0]);
								this.list_baidang.splice(index, 1,tam);
								this.changeDetectorRefs.detectChanges();
								
							}
						});
					}
	
		
				Update_BAIDANG_4(id_:number,index, indexc = -1) {
					//	debugger
					this.item=( this.list_baidang.find(x => x.Id_BaiDang ==id_));
				
						
					var _item = new BaiDangModel;
				   let saveMessageTranslateParam = '';
					_item = this.item;
				  
				   const dialogRef = this.dialog.open(ChaoDonThanhvienEditComponent, {
					   width: '500px',
					   height:'400px',
					   data: {_item} })
				   
				   dialogRef.afterClosed().subscribe(res => {
	   
					   if (res) {
							   
						
						var tam=Object.assign(res[0]);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
						   // this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
						  
					   }
					   else
					   {
					
						var tam=Object.assign(res[0]);
						this.list_baidang.splice(index, 1,tam);
						this.changeDetectorRefs.detectChanges();
					   }
				   });
				}

			
				UpdateBaiDang_2(id_:number,index,indexc=-1) {
			 
				
					this.item=( this.list_baidang.find(x => x.Id_BaiDang ==id_));
				
						
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
						
							var tam=Object.assign(res[0]);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
						}
						else
						{
							var tam=Object.assign(res);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
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

						// like bài đăng
		like(id:number,type:number) {
			
			this._services.like(id,type).subscribe(res => {
				if (res && res.status == 1) {
				
				//	this.ThongBaotInsert_like_baidang(id);
					//this.loadDataList();
				
					let index=this.list_baidang.findIndex(x=>x.Id_BaiDang===id);
					
					if(this.list_baidang[index].Like===null)
					{
						this.list_baidang[index].Like=Object.assign(res.data[0].Like);
					}
					else

					{
					
					
						if(type===0)
						{
							//delete this.list_baidang[index].Like;
							this.list_baidang[index].Like=null;
						}
						else

						{
							delete this.list_baidang[index].Like;
							this.list_baidang[index].Like = Object.assign(res.data[0].Like);
						}
						
						
					
					}
					if(this.list_baidang[index].Like_BaiDang===null)
					{
						//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
						this.list_baidang[index].Like_BaiDang=res.data[0].Like_BaiDang.slice();
					}
					else

					{
						// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);

						this.list_baidang[index].Like_BaiDang=null;
						if(res.data[0].Like_BaiDang.length>0)
						{
							// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
							this.list_baidang[index].Like_BaiDang=res.data[0].Like_BaiDang.slice();
						}
						else

						{
							this.list_baidang[index].Like_BaiDang=[];
						}
						
					}
					
					this.changeDetectorRefs.detectChanges();
				}
			})
		}

		

//   lấy list like (haha, love.....)

		GetListLike()
		{
			this._services.getlist_like().subscribe(res => {
				this.list_icon=res.data;
				this.changeDetectorRefs.detectChanges();

			})
		}



	
		pageSize: number=0;
// load  dữ liệu bài đăng (cmt,like) bằng datasource để realtime
  loadDataList() {
	const queryParams1 = new QueryParamsModelNewLazy(
	
		'',
		'',
		'',
		this.pageSize=0,
		2,
		false,
	
		// pageNumber: number;
		// pageSize: number;
		// more: boolean;
		
	);
	this._services.getlistBaiDang(queryParams1).subscribe((res) => {
	
			this.data= res.data;
			console.log('Page',this.pageSize);
			this.list_baidang=this.data.slice();
	console.log('Dữ liệu bài đăng',this.list_baidang);
	
			
		     this.changeDetectorRefs.detectChanges();
	})
  }

  loadDataListLayzy(page:number) {

	const queryParams1 = new QueryParamsModelNewLazy(
	
		'',
		'',
		'',
		page,
		2,
		false,
	
		// pageNumber: number;
		// pageSize: number;
		// more: boolean;
		
	);
	this._services.getlistBaiDang(queryParams1).subscribe((res) => {
			//this.data.push(res.data);
			if(res.data!=null){
				for(let i = 0; i < res.data.length; i++)
				{

				
			
				this.list_baidang.push(res.data[i]);
				 this.changeDetectorRefs.detectChanges();
				}
			}
			else

			{
				
				// const _messageType = this.translate.instant('No Data');
				// 	this.layoutUtilsService.showActionNotification(_messageType, MessageType.Create, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
				// 	});
					return;
			}
			
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
		  this.listKhenThuong=res.data;

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
//   list_ds_cmt:any[]=[];
//   LoadDSComment(id:number)

//   {
// 	  debugger
// 	  this._service_cmt.getDSComment(id).subscribe(res=>{
// 		  let index=this.list_baidang.findIndex(x=>x.Id_BaiDang===id);
// 			this.list_baidang[index].Coment=Object.assign(res.data);
// 			console.log('Data comment list',res.data)
// 			this.changeDetectorRefs.detectChanges();
// 	  })
//   }

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
   this.LoadMedia();

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
				this.list_rep=res.data;	
				this.dulieu_cmt_child="@"+this.list_rep[0].Username;
				this.changeDetectorRefs.detectChanges();

		})

	
	
	}

	Share(id_bd:number)

	{
			this._services_canhan.ChiaSeBaiDang(this.id_user,id_bd).subscribe(res=>{
				const _messageType = this.translate.instant('Chia Sẻ Thành Công !');
					this.layoutUtilsService.showActionNotification(_messageType, MessageType.Update, 3000, true, false, 3000, 'top').afterDismissed().subscribe(tt => {
					});
			})
	}


	
	onScroll(event) {

		this.pageSize+=1;
		this.loadDataListLayzy(this.pageSize);


}

  }
