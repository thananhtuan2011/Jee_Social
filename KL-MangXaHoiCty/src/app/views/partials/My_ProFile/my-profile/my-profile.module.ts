import { UploadfileService } from './../../../pages/home/Bai-Dang/_Services/uploadfile.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
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
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from '../change-pass/change-pass.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [

	MyProfileComponent,
	ChangePassComponent,
  ],
  entryComponents: [
	ChangePassComponent
  ],

  providers: [
	DatePipe,
	UploadfileService,
	
    
  ],
  imports: [
	CommonModule,
	HttpClientModule,

	

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
    ReactiveFormsModule, 
		NgbTooltipModule,
    CommonModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
