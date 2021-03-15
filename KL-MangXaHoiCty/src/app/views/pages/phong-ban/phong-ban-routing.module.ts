import { PhongKyThuatComponent } from './phong-ky-thuat/phong-ky-thuat.component';
import { PhongNhanSuComponent } from './phong-nhan-su/phong-nhan-su.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KinhDoanhComponent } from './kinh-doanh/kinh-doanh.component';
import { KeToanComponent } from './ke-toan/ke-toan.component';


const routes: Routes = [
  // {path:'phongban',component:PhongNhanSuComponent}
  {path:'nhansu', component:PhongNhanSuComponent},
  {path:'kythuat', component:PhongKyThuatComponent},
  {path:'kinhdoanh', component:KinhDoanhComponent},
  {path:'ketoan', component:KeToanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhongBanRoutingModule { }
