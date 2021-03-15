import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { ThongDiepComponent } from './thong-diep/thong-diep.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentHomeComponent } from './content-home/content-home.component';
import { HomeComponent } from './home.component';
import { BaiDangDetailComponent } from './Bai-Dang/bai-dang-detail/bai-dang-detail.component';
import { GroupViewComponent } from './Group/group-view/group-view.component';
import { QuanlygroupComponent } from './Group/quanlygroup/quanlygroup.component';
import { DetailBaidangCommentComponent } from './Bai-Dang/detail-baidang-comment/detail-baidang-comment.component';
import { DanhSachThanhVienComponent } from './Group/danh-sach-thanh-vien/danh-sach-thanh-vien.component';
import { DetailThongdiepComponent } from './thong-diep/detail-thongdiep/detail-thongdiep.component';
import { TrangCaNhanComponent } from './trang-ca-nhan/trang-ca-nhan/trang-ca-nhan.component';
import { QuanLyBaiDangGroupComponent } from './Group/quan-ly-bai-dang-group/quan-ly-bai-dang-group.component';



const routes: Routes = [
	{
		path: 'groups/create',
		component: CreateGroupComponent,

	},
	{
		path: 'trangcanhan',
		component: TrangCaNhanComponent,

	},
	{
		path: 'thanhvien/group/:id_group',
		component: QuanlygroupComponent,

	},	
	{
		path: 'quanlybaidang/group/:id_group',
		component: QuanLyBaiDangGroupComponent,

	},	
	{
		path: 'Onlyreadthanhvien/group/:id_group',
		component: DanhSachThanhVienComponent,

	},	
	{
		path: 'detail_thongdiep/:id_',
		component: DetailThongdiepComponent,

	},	
	
	
	{
			
		
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				component: ContentHomeComponent,
				// children:[
				// 	{
				// 		path: 'chat',
				// 		component: ChatboxComponent,
						
				// 	},	
				// ]
				
			},	

			{
				path: 'detail/:id',
				component: BaiDangDetailComponent,
				
			},	
		

			{
				path: 'comment/:id',
				component: DetailBaidangCommentComponent,
				
			},	
			{
				path: 'group/:id_group',
				component: GroupViewComponent,

			},	

			

			

			
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
