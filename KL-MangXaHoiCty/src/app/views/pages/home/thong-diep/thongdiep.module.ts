import { MatButtonModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatDialogModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongdiepRoutingModule } from './thongdiep-routing.module';
import { NguyenTacLamviecComponent } from './nguyen-tac-lamviec/nguyen-tac-lamviec.component';
import { ThongDiepViewComponent } from './thong-diep-view/thong-diep-view.component';
import { ThongdiepService } from './thongdiep.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SuaThongDiepComponent } from './sua-thong-diep/sua-thong-diep.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailThongdiepComponent } from './detail-thongdiep/detail-thongdiep.component';

@NgModule({
  declarations: [
    
    NguyenTacLamviecComponent,
    ThongDiepViewComponent,
    SuaThongDiepComponent,
    //  DetailThongdiepComponent,
 
   
  ],
  entryComponents: [
   
    SuaThongDiepComponent,
  
  
  ],
  providers: [

    ThongdiepService
  
  ],
  imports: [
    CommonModule,
    ThongdiepRoutingModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ,
    MatDialogModule
 
  ]
})
export class ThongdiepModule { }
