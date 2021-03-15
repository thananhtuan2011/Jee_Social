import { LoginComponent } from './../../../auth/login/login.component';
import { PortletModule } from '../../../../partials/content/general/portlet/portlet.module';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { PopoverModule } from 'ngx-smart-popover';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { ViewMediaDialogComponent } from './view-media-dialog/view-media-dialog.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShowmediaComponent } from './view-media-dialog/showmedia/showmedia.component';
import { MediaService } from '../media.service';
import { EditMediaComponent } from './view-media-dialog/edit-media/edit-media.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';


@NgModule({
  declarations: [
    ViewMediaDialogComponent,
    ShowmediaComponent,
	EditMediaComponent,
	
  ],
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
		
	
		
		PerfectScrollbarModule,
		InlineSVGModule,
		MatGridListModule,
		
		// FormsModule ,
		ReactiveFormsModule,
		// BaiDangModule
		RouterModule.forChild([
			{
				path: '',
				component: ViewMediaDialogComponent,
				children: [
					{
						path: 'detail/:id_media',
						component: ShowmediaComponent
					
					},
				]
			},
		]),
  ],
  providers: [
	MediaService
  ],
  entryComponents: [
	ViewMediaDialogComponent,
	EditMediaComponent
  ]
})
export class MediaModule { }
