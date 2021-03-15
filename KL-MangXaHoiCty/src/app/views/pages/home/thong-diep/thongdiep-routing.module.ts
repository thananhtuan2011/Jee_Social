
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NguyenTacLamviecComponent } from './nguyen-tac-lamviec/nguyen-tac-lamviec.component';
import { ThongDiepViewComponent } from './thong-diep-view/thong-diep-view.component';


const routes: Routes = [
  {path:'lamviec',component:NguyenTacLamviecComponent,
  
},
{path:'CEO',component:ThongDiepViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongdiepRoutingModule { }
