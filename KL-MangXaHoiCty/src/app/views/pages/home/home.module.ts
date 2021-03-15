import { FlowCaNhanService } from './../Flow-Trang-ca-nhan/flow-ca-nhan.service';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { GroupService } from './Bai-Dang/_Services/group.service';



import { BaiDangDataSource } from './../../../core/auth/_data-sources/baidang.datasource';
import { BaiDangService } from './Bai-Dang/_Services/bai-dang.service';


import { CUSTOM_ELEMENTS_SCHEMA, NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatFormFieldModule, MatChipsModule } from '@angular/material';
import { ToolbarLeftComponent } from './toolbar-left/toolbar-left.component';
import { ToolUserRightComponent } from './tool-user-right/tool-user-right.component';
import { NgbDropdownModule, NgbModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentHomeComponent } from './content-home/content-home.component';
import { ContentLeftComponent } from './content-left/content-left.component';
import { ThongDiepComponent } from './thong-diep/thong-diep.component';
import {  ReactiveFormsModule } from '@angular/forms';
	
import {  FormsModule } from '@angular/forms';
import { TypePostComponent } from './type-post/type-post.component';
import { TinNhanhComponent } from './Template_LoaiBaiDang/tin-nhanh/tin-nhanh.component';
import { KhenThuongComponent } from './Template_LoaiBaiDang/khen-thuong/khen-thuong.component';
import { TinTucNoiBoComponent } from './Template_LoaiBaiDang/tin-tuc-noi-bo/tin-tuc-noi-bo.component';
import { ChaoDonThanhVienMoiComponent } from './Template_LoaiBaiDang/chao-don-thanh-vien-moi/chao-don-thanh-vien-moi.component';
import { ThongBaoComponent } from './Template_LoaiBaiDang/thong-bao/thong-bao.component';

import { ClickColorDirective } from './click-color.directive';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@tinymce/tinymce-angular'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PopoverModule } from 'ngx-smart-popover';
import { CommentService } from './Bai-Dang/_Services/comment.service';
import { BaidangEditComponent } from './Bai-Dang/baidang-edit/baidang-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentEditDialogComponent } from './Comment/comment-edit-dialog/comment-edit-dialog.component';
import { TinNhanhEditComponent } from './Bai-Dang/tin-nhanh-edit/tin-nhanh-edit.component';
import { ChaoDonThanhvienEditComponent } from './Bai-Dang/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from './Bai-Dang/khen-thuong-edit/khen-thuong-edit.component';
import { DeXuatComponent } from './Template_LoaiBaiDang/de-xuat/de-xuat.component';
import { DeXuatEditComponent } from './Bai-Dang/de-xuat-edit/de-xuat-edit.component';
import { BaiDangDetailComponent } from './Bai-Dang/bai-dang-detail/bai-dang-detail.component';
import { GroupViewComponent } from './Group/group-view/group-view.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { EditGroupComponent } from './Group/edit-group/edit-group.component';
import { ChooseUserComponent } from './Group/choose-user/choose-user.component';

import { InsertThanhvienComponent } from './Group/insert-thanhvien/insert-thanhvien.component';
import { VaiTroGroupComponent } from './Group/vai-tro-group/vai-tro-group.component';
import { ChooseUserInGroupComponent } from './Group/choose-user-in-group/choose-user-in-group.component';

import { PhongbanService } from '../phong-ban/phongban.service';
import { QuanlygroupComponent } from './Group/quanlygroup/quanlygroup.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { UploadfileService } from './Bai-Dang/_Services/uploadfile.service';
import { ThongbaoService } from './Bai-Dang/_Services/thongbao.service';
import { EditQuyenComponent } from './Group/edit-quyen/edit-quyen.component';
import { MediaComponent } from './media/media.component';
import { MediaTinvanbanComponent } from './media/media-tinvanban/media-tinvanban.component';
import { MediaService } from './media/media.service';
import { MyNewComponent } from './media/my-new/my-new.component';
import { ColorPickerComponent } from './media/color-picker/color-picker.component';
import { MediaDetailComponent } from './media/media-detail/media-detail.component';
import { AlertComponent } from './../../partials/content/crud/alert/alert.component';
import { DeleteEntityDialogComponent } from './../../partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { ActionNotificationComponent } from './../../partials/content/crud/action-natification/action-notification.component';
import { FetchEntityDialogComponent } from '../../partials/content/crud/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from '../../partials/content/crud/update-status-dialog/update-status-dialog.component';
import { DetailBaidangCommentComponent } from './Bai-Dang/detail-baidang-comment/detail-baidang-comment.component';
import { ThongdiepService } from './thong-diep/thongdiep.service';
import { ChatCaNhanService } from './tool-user-right/chat-ca-nhan-service/chat-ca-nhan.service';

import { MychatService } from '../MyChat/mychat.service';
import { DeletechatComponent } from '../MyChat/deletechat/deletechat.component';
import { EditMessComponent } from '../MyChat/edit-mess/edit-mess.component';
import { EditChatUserComponent } from './tool-user-right/edit-chat-user/edit-chat-user.component';
import { DeleteChatUserComponent } from './tool-user-right/delete-chat-user/delete-chat-user.component';
import { DanhSachThanhVienComponent } from './Group/danh-sach-thanh-vien/danh-sach-thanh-vien.component';
import { DetailThongdiepComponent } from './thong-diep/detail-thongdiep/detail-thongdiep.component';

import { TrangCaNhanComponent } from './trang-ca-nhan/trang-ca-nhan/trang-ca-nhan.component';
import { BaidangTrangcanhanComponent } from './trang-ca-nhan/baidang-trangcanhan/baidang-trangcanhan.component';
import { GioithieuComponent } from './trang-ca-nhan/gioithieu/gioithieu.component';
import { TrangCaNhanService } from './trang-ca-nhan/trang-ca-nhan.service';

import { MdePopoverModule } from '@material-extended/mde';
import { PopoverTriggerDirective } from './trang-ca-nhan/popover-trigger.directive';
import { UpdateAvtarComponent } from './trang-ca-nhan/update-avtar/update-avtar.component';
import { EditTieusuComponent } from './trang-ca-nhan/edit-tieusu/edit-tieusu.component';
import { QuanLyBaiDangGroupComponent } from './Group/quan-ly-bai-dang-group/quan-ly-bai-dang-group.component';
// import { SignalrService } from './signalr.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingModule } from 'ngx-loading';




@NgModule({
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [HomeComponent, 
PopoverTriggerDirective,
	
	ToolbarLeftComponent, ToolUserRightComponent, ContentHomeComponent, ContentLeftComponent, 
	
	 TypePostComponent, TinNhanhComponent, KhenThuongComponent, TinTucNoiBoComponent, ChaoDonThanhVienMoiComponent, ThongBaoComponent,

	 ClickColorDirective,
	 BaidangEditComponent,
	 CommentEditDialogComponent,
	 TinNhanhEditComponent,
	 ChaoDonThanhvienEditComponent,
	 KhenThuongEditComponent,
	 DeXuatComponent,
	 DeXuatEditComponent,
	 BaiDangDetailComponent,
	 GroupViewComponent,
	 CreateGroupComponent,
	 EditGroupComponent,
	 ChooseUserComponent,
	
	 
	 InsertThanhvienComponent,
	 VaiTroGroupComponent,
	 ChooseUserInGroupComponent,
	 QuanlygroupComponent,
	 EditQuyenComponent,
	 MediaComponent,
	 MediaTinvanbanComponent,
	 MyNewComponent,
	 ColorPickerComponent,
	 MediaDetailComponent,
	 DetailBaidangCommentComponent,
	 ThongDiepComponent,
	 EditChatUserComponent,
	 DeleteChatUserComponent,
	 DanhSachThanhVienComponent,
	 DetailThongdiepComponent ,
	 TrangCaNhanComponent,
	 BaidangTrangcanhanComponent,
	 GioithieuComponent,
	 UpdateAvtarComponent,
	 EditTieusuComponent,
	 QuanLyBaiDangGroupComponent,
	//  DeletechatComponent,
	//  EditMessComponent
	
	
	 


	
	 


	
	
  
  ],
// nơi add component cho Diglog
  entryComponents: [TypePostComponent,  TinNhanhComponent, KhenThuongComponent,
	MediaComponent,
	EditTieusuComponent,
	UpdateAvtarComponent,
	MediaTinvanbanComponent,
	TinTucNoiBoComponent,
	ChaoDonThanhVienMoiComponent, ThongBaoComponent,
	BaidangEditComponent,
	CommentEditDialogComponent,
	TinNhanhEditComponent,
	ChaoDonThanhvienEditComponent,
	KhenThuongEditComponent,
	DeXuatComponent,
	DeXuatEditComponent,
	EditGroupComponent,
	EditQuyenComponent,
	InsertThanhvienComponent,
	VaiTroGroupComponent,
	MediaDetailComponent,
	EditChatUserComponent,
DeleteChatUserComponent
	// ChatboxComponent
	// DeletechatComponent,
	// EditMessComponent




	


],
providers: [
	
	BaiDangService,
	BaiDangDataSource,
	CommentService,
	GroupService,
	PhongbanService,
	// SignalrService
	UploadfileService,
	ThongbaoService,
	MediaService,
	ChatCaNhanService,
	MychatService,
	TrangCaNhanService,
	FlowCaNhanService
	
	

	


],
  imports: [
	LoadingModule,
	InfiniteScrollModule,
	NgbModule,
	MdePopoverModule,
	PickerModule,
	NgxMatSelectSearchModule,
	MatChipsModule,
	MatSelectModule,
	PopoverModule,
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatIconModule,
	MatButtonModule,
	CKEditorModule,
	HttpClientModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		AngularEditorModule ,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatCardModule,
		MatBadgeModule,
		EditorModule,
		// ng-bootstrap modules
		NgbDropdownModule,
		NgbTabsetModule,
	NgbTooltipModule,
	FormsModule,
	MatFormFieldModule,
	PortletModule,
	PickerModule,




	

	



    
    PerfectScrollbarModule,
	InlineSVGModule,
	MatGridListModule,
	FlexLayoutModule,
	// FormsModule ,
	ReactiveFormsModule,
	// BaiDangModule

  ]
})
export class HomeModule { }
