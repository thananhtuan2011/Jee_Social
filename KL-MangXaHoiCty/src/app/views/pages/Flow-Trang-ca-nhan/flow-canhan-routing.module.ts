import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayTrangCaNhanComponent } from './display-trang-ca-nhan/display-trang-ca-nhan.component';
import { FlowCaNhanComponent } from './flow-ca-nhan.component';


const routes: Routes = [

  {path: '', component:FlowCaNhanComponent,
          children: [
        {
        
          path: 'canhan/:id_canhan',
           component: DisplayTrangCaNhanComponent
        
        },

      ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowCanhanRoutingModule { }
