import { AlertComponent } from './../../partials/content/crud/alert/alert.component';
import { DeleteEntityDialogComponent } from './../../partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { ActionNotificationComponent } from './../../partials/content/crud/action-natification/action-notification.component';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { PopoverModule } from 'ngx-smart-popover';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuanLyPhanQuyenComponent } from './quan-ly-phan-quyen/quan-ly-phan-quyen.component';
import { DashboardService } from './dashboard.service';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { EditQuyenUserComponent } from './edit-quyen-user/edit-quyen-user.component';
import { QuanlyBaidangComponent } from './quanly-baidang/quanly-baidang.component';
import { QuanLyThanhVienComponent } from './quan-ly-thanh-vien/quan-ly-thanh-vien.component';
import { FetchEntityDialogComponent } from '../../partials/content/crud/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from '../../partials/content/crud/update-status-dialog/update-status-dialog.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChoseNvComponent } from './chose-nv/chose-nv.component';
import { QuanlyBaidangDang2Component } from './quanly-baidang-dang2/quanly-baidang-dang2.component';
import { CommentService } from '../home/Bai-Dang/_Services/comment.service';
import { UploadfileService } from '../home/Bai-Dang/_Services/uploadfile.service';
import { BaiDangService } from '../home/Bai-Dang/_Services/bai-dang.service';

@NgModule({
	imports: [
		NgxMatSelectSearchModule,
		MatChipsModule,
		MatSelectModule,
		PopoverModule,
		CommonModule,
	
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		
		HttpClientModule,
			MatMenuModule,
			MatSelectModule,
			MatInputModule,
			MatTableModule,
			MatAutocompleteModule,
			MatRadioModule,
			
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
			
		NgbTooltipModule,
		FormsModule,
		MatFormFieldModule,
		PortletModule,
	
		MatStepperModule,
		
		PerfectScrollbarModule,
		InlineSVGModule,
		MatGridListModule,
		
		// FormsModule ,
		ReactiveFormsModule,
		// BaiDangModule
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent,
				children: [
					{
						path: 'phanquyen',
						component: QuanLyPhanQuyenComponent
					},
					{
						path: 'quanlybaidang',
						component: QuanlyBaidangComponent
					},
					{
						path: 'quanlybaidang_detail',
						component: QuanlyBaidangDang2Component
					},
					{
						path: 'quanlythanhvien',
						component: QuanLyThanhVienComponent

					},
					{path: '', redirectTo: 'phanquyen', pathMatch: 'full'},
				]
			},
		]),
	],
	providers: [
		DashboardService,
		CommentService,
		UploadfileService,
		BaiDangService
	],
	declarations: [
		DashboardComponent,
		QuanLyPhanQuyenComponent,
		EditQuyenUserComponent,
		QuanlyBaidangComponent,
		QuanLyThanhVienComponent,
		CreateUserComponent,
		ChoseNvComponent,
		QuanlyBaidangDang2Component,
	
	],
	entryComponents: [
		EditQuyenUserComponent,
		CreateUserComponent,
	
		

	]
})
export class DashboardModule {
}
