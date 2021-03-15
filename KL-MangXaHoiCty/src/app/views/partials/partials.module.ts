import { ThongbaoService } from './../pages/home/Bai-Dang/_Services/thongbao.service';
import { TimeAgoPipe } from './time-ago.pipe';
import { PartialsRoutingModule } from './partials/partials-routing.module';
// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatBadgeModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
} from '@angular/material';
// NgBootstrap
import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Core module
import {CoreModule} from '../../core/core.module';
// CRUD Partials
import {
	ActionNotificationComponent,
	AlertComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent,
} from './content/crud';
// Layout partials
import {
	ContextMenu2Component,
	ContextMenuComponent,
	LanguageSelectorComponent,
	NotificationComponent,
	QuickActionComponent,
	QuickPanelComponent,
	ScrollTopComponent,
	SearchDefaultComponent,
	SearchDropdownComponent,
	SearchResultComponent,
	SplashScreenComponent,
	StickyToolbarComponent,
	// Subheader1Component,
	// Subheader2Component,
	// Subheader3Component,
	Subheader4Component,
	Subheader5Component,
	SubheaderSearchComponent,
	
	UserProfile3Component,
	
	MessengerComponent
	
} from './layout';
// General
import {NoticeComponent} from './content/general/notice/notice.component';
import {PortletModule} from './content/general/portlet/portlet.module';
// Errpr
import {ErrorComponent} from './content/general/error/error.component';
// Extra module
import {WidgetModule} from './content/widgets/widget.module';
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
import {CartComponent} from './layout/topbar/cart/cart.component';
import { MyProfileComponent } from './My_ProFile/my-profile/my-profile.component';
import { SignalrService } from '../pages/home/signalr.service';
import { BaiDangService } from '../pages/home/Bai-Dang/_Services/bai-dang.service';
import { ProfileService } from './My_ProFile/profile.service';
import { ChangePassComponent } from './My_ProFile/change-pass/change-pass.component';
import { CreateThongdiepComponent } from '../pages/home/thong-diep/create-thongdiep/create-thongdiep.component';
import { ThongdiepService } from '../pages/home/thong-diep/thongdiep.service';
import { MychatService } from '../pages/MyChat/mychat.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


// import { SignalrService } from '../pages/home/signalr.service';
// import { MessengerComponent } from './layout/topbar/messenger/messenger.component';

@NgModule({
	declarations: [
		CreateThongdiepComponent,
		ScrollTopComponent,
		NoticeComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,
		TimeAgoPipe,
		
		// topbar components
		ContextMenu2Component,
		ContextMenuComponent,
		QuickPanelComponent,
		ScrollTopComponent,
		SearchResultComponent,
		SplashScreenComponent,
		StickyToolbarComponent,
		// Subheader1Component,
		// Subheader2Component,
		// Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SubheaderSearchComponent,
		LanguageSelectorComponent,
		NotificationComponent,
		QuickActionComponent,
		SearchDefaultComponent,
		SearchDropdownComponent,
		// UserProfileComponent,
		// UserProfile2Component,
		UserProfile3Component,
		CartComponent,

		ErrorComponent,

		MessengerComponent,
		// EditThongDiepComponent

	

	
	],
	entryComponents: [
		CreateThongdiepComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,
		// EditThongDiepComponent
	  ],
	providers: [
	
	
		SignalrService,
		BaiDangService,
		ThongbaoService,
		ProfileService,
		ThongdiepService,
		MychatService
	
	
	],
	exports: [
		WidgetModule,
		PortletModule,

		ScrollTopComponent,
		NoticeComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,

		// topbar components
		ContextMenu2Component,
		ContextMenuComponent,
		QuickPanelComponent,
		ScrollTopComponent,
		SearchResultComponent,
		SplashScreenComponent,
		StickyToolbarComponent,
		// Subheader1Component,
		// Subheader2Component,
		// Subheader3Component,
		Subheader4Component,
		Subheader5Component,
		SubheaderSearchComponent,
		LanguageSelectorComponent,
		NotificationComponent,
		QuickActionComponent,
		SearchDefaultComponent,
		SearchDropdownComponent,
		// UserProfileComponent,
		// UserProfile2Component,
		UserProfile3Component,
		CartComponent,
		MessengerComponent,
		ErrorComponent,
	
	],
	imports: [
			
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		CoreModule,
		PortletModule,
		WidgetModule,
		PartialsRoutingModule,

		// angular material modules
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
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
		NgbTabsetModule,
		NgbTooltipModule,
		Ng2SearchPipeModule
	],
})
export class PartialsModule {
}
