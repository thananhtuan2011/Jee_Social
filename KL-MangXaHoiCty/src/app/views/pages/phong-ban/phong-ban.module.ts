import { PortletModule } from './../../partials/content/general/portlet/portlet.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhongBanRoutingModule } from './phong-ban-routing.module';
import { PhongNhanSuComponent } from './phong-nhan-su/phong-nhan-su.component';
import { PhongbanComponent } from './phongban/phongban.component';
import { PhongKyThuatComponent } from './phong-ky-thuat/phong-ky-thuat.component';
import { KinhDoanhComponent } from './kinh-doanh/kinh-doanh.component';
import { KeToanComponent } from './ke-toan/ke-toan.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { MatDatepickerModule, MatExpansionModule, MatProgressBarModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatPaginatorIntl, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PhongbanService } from './phongban.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [PhongNhanSuComponent, PhongbanComponent, PhongKyThuatComponent, KinhDoanhComponent, KeToanComponent],

  entryComponents: [  
  ],
  providers: [
	
    PhongbanService,
  
  ],
  imports: [
    CommonModule,
    PhongBanRoutingModule,
    CommonModule,
		HttpClientModule,
    MatSortModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
    PerfectScrollbarModule,
		MatDatepickerModule,
		MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PortletModule,PhongBanRoutingModule,
    MatPaginatorModule,
  
  ]
})
export class PhongBanModule { }
