import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LuuTruRoutingModule } from './luu-tru-routing.module';
import { KhenThuongComponent } from './khen-thuong/khen-thuong.component';
import { MatAutocompleteModule, MatBadgeModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LuutruService } from './luutru.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TinTucNoiBoComponent } from './tin-tuc-noi-bo/tin-tuc-noi-bo.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { ThongBaoComponent } from './thong-bao/thong-bao.component';
import { GhimComponent } from './ghim/ghim.component';


@NgModule({
  declarations: [KhenThuongComponent, TinTucNoiBoComponent, ThongBaoComponent, GhimComponent],
  providers:[
	LuutruService
  ],
  imports: [
	CommonModule,
	PerfectScrollbarModule,
    LuuTruRoutingModule,
    
		MatAutocompleteModule,
		MatRadioModule,

		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		PortletModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatCardModule,
		MatBadgeModule,
		MatProgressSpinnerModule,
		MatTableModule,
		// ng-bootstrap modules
		NgbDropdownModule,
		NgbTabsetModule,
	NgbTooltipModule,
	MatSortModule,
	FormsModule,
	MatFormFieldModule,
	MatPaginatorModule
	
    
  ]
})
export class LuuTruModule { }
