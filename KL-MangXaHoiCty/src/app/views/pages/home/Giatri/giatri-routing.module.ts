import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaTriConNguoiComponent } from './gia-tri-con-nguoi/gia-tri-con-nguoi.component';
import { LinhHoatComponent } from './linh-hoat/linh-hoat.component';
import { UyTinComponent } from './uy-tin/uy-tin.component';


const routes: Routes = [
  {path:'connguoi',component:GiaTriConNguoiComponent},
  {path:'uytin',component:UyTinComponent},
  {path:'trachnhiem',component:LinhHoatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiatriRoutingModule { }
