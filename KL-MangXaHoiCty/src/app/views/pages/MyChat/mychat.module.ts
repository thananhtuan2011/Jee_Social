import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MychatViewComponent } from './mychat-view/mychat-view.component';
import { RouterModule } from '@angular/router';
import { MychatComponent } from './mychat.component';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldControl, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { PopoverModule } from 'ngx-smart-popover';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { MychatService } from './mychat.service';
import { ChatCaNhanService } from '../home/tool-user-right/chat-ca-nhan-service/chat-ca-nhan.service';
import { DeletechatComponent } from './deletechat/deletechat.component';
import { EditMessComponent } from './edit-mess/edit-mess.component';
import { EmojiFrequentlyService, EmojiSearch, PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { DeleteAllmessComponent } from './delete-allmess/delete-allmess.component';
import { UploadfileService } from '../home/Bai-Dang/_Services/uploadfile.service';
import { ViewChatComponent } from './view-chat/view-chat.component';


@NgModule({
  declarations: [
	//   MychatViewComponent,
    MychatComponent,
    DeletechatComponent,
    EditMessComponent,
	DeleteAllmessComponent,
	ViewChatComponent ,
	 MychatViewComponent
  
  ],
  providers: [
	MychatService,
	ChatCaNhanService,
	UploadfileService
	// EmojiFrequentlyService,
	// EmojiSearch,
	// EmojiService
  ],
  entryComponents: [
	DeletechatComponent,
	EditMessComponent
  ],
  imports: [
    
		MatChipsModule,
		MatSelectModule,
		PopoverModule,
		CommonModule,
		InlineSVGModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		PickerModule,
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
			// ng-bootstrap modules
			NgbDropdownModule,
			
		NgbTooltipModule,
		FormsModule,
		MatFormFieldModule,
		PortletModule,
		
	
	
		MatInputModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		MatGridListModule,
		
		// FormsModule ,
		ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
			{
				path: '',
				component: MychatComponent,
			
				children: [
					{	path: 'chat/:id_cr',
						// path: 'chat',
						component: MychatViewComponent
					},
					// {
					// 	path: 'quanlybaidang',
					// 	component: QuanlyBaidangComponent
					// },
					// {
					// 	path: 'quanlythanhvien',
					// 	component: QuanLyThanhVienComponent

					// },
					// {path: '', redirectTo: 'phanquyen', pathMatch: 'full'},
				]
			},
		]),
	
  ]


})
export class MychatModule { }
