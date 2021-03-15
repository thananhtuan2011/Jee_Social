import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatFormFieldModule, MatChipsModule } from '@angular/material';

import { FlowGioithieuCanhanComponent } from './flow-gioithieu-canhan/flow-gioithieu-canhan.component';
import { FlowBaidangCanhanComponent } from './flow-baidang-canhan/flow-baidang-canhan.component';
import { FlowCaNhanComponent } from './flow-ca-nhan.component';
import { FlowCanhanRoutingModule } from './flow-canhan-routing.module';
import { DisplayTrangCaNhanComponent } from './display-trang-ca-nhan/display-trang-ca-nhan.component';
import { NgbModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaiDangService } from '../home/Bai-Dang/_Services/bai-dang.service';
import { CommentService } from '../home/Bai-Dang/_Services/comment.service';
import { GroupService } from '../home/Bai-Dang/_Services/group.service';
import { UploadfileService } from '../home/Bai-Dang/_Services/uploadfile.service';
import { ThongbaoService } from '../home/Bai-Dang/_Services/thongbao.service';
import { ChatCaNhanService } from '../home/tool-user-right/chat-ca-nhan-service/chat-ca-nhan.service';
import { MychatService } from '../MyChat/mychat.service';
import { TrangCaNhanService } from '../home/trang-ca-nhan/trang-ca-nhan.service';
import { FlowCaNhanService } from './flow-ca-nhan.service';
import { PopoverModule } from 'ngx-smart-popover';


@NgModule({
  declarations: [
    FlowBaidangCanhanComponent,
    FlowGioithieuCanhanComponent,
    FlowCaNhanComponent,
    DisplayTrangCaNhanComponent,

  ],

  providers: [
	
    BaiDangService,
   
    CommentService,
    GroupService,
    FlowCaNhanService,
    // SignalrService
    UploadfileService,
    ThongbaoService,
    
    ChatCaNhanService,
    MychatService,
    TrangCaNhanService
    
  
    
  
  
  ],
  imports: [
    CommonModule,
    FlowCanhanRoutingModule,
    NgbModule,

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
		// ng-bootstrap modules
		NgbTabsetModule,
	NgbTooltipModule,
	FormsModule,
	MatFormFieldModule,
	PortletModule,




	

	



    
    PerfectScrollbarModule,
	InlineSVGModule,
	MatGridListModule,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
  ]
})
export class FlowCanhanModule { }
