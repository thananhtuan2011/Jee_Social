import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhimComponent } from './ghim/ghim.component';
import { KhenThuongComponent } from './khen-thuong/khen-thuong.component';
import { ThongBaoComponent } from './thong-bao/thong-bao.component';
import { TinTucNoiBoComponent } from './tin-tuc-noi-bo/tin-tuc-noi-bo.component';


const routes: Routes = [
  // {path:'user', component:},
  // {path:'thongbao', component:},
  {path:'khenthuong', component:KhenThuongComponent},
  {path:'tintucnoibo', component:TinTucNoiBoComponent},
  {path:'thongbao', component:ThongBaoComponent},
  {path:'ghim', component:GhimComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuuTruRoutingModule { }
