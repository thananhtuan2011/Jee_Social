import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiatriRoutingModule } from './giatri-routing.module';
import { GiaTriConNguoiComponent } from './gia-tri-con-nguoi/gia-tri-con-nguoi.component';
import { UyTinComponent } from './uy-tin/uy-tin.component';
import { LinhHoatComponent } from './linh-hoat/linh-hoat.component';


@NgModule({
  declarations: [GiaTriConNguoiComponent, UyTinComponent, LinhHoatComponent],
  imports: [
    CommonModule,
    GiatriRoutingModule
  ]
})
export class GiatriModule { }
