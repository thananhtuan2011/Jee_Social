
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [

	// { path: '', pathMatch: 'full', redirectTo: 'auth' },
	
	 {path: 'auth', loadChildren: () => import('../app/views/pages/auth/auth.module').then(m => m.AuthModule)},
	//  {path: '', redirectTo: 'auth', pathMatch: 'full'},// load lên trang đầu tiên
	
	{
		path: '',
		component: BaseComponent,
		  canActivate: [AuthGuard],
			children: [
				{
				
					path: 'luutru',
					loadChildren: () => import('../app/views/pages/luu-tru/luu-tru.module').then(m => m.LuuTruModule)
				},
			
			{
				path: 'phongban',
				loadChildren: () => import('../app/views/pages/phong-ban/phong-ban.module').then(m => m.PhongBanModule)
			},
			{
				path: 'giatri',
				loadChildren: () => import('../app/views/pages/home/Giatri/giatri.module').then(m => m.GiatriModule)
			},
			
			{
				path: 'home',
				loadChildren: () => import('../app/views/pages/home/home.module').then(m => m.HomeModule)
			},
			{
				path: 'nguyentac',
				loadChildren: () => import('./views/pages/home/thong-diep/thongdiep.module').then(m => m.ThongdiepModule)
			},
		
			{
				path: 'myprofile',
				loadChildren: () => import('../app/views/partials/My_ProFile/my-profile/my-profile.module').then(m => m.MyProfileModule)
			},
			
			// {
			// 	path: 'ngbootstrap',
			// 	loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
			// },
		 		{
				path: 'FlowCaNhan',
				loadChildren: () => import('../app/views/pages/Flow-Trang-ca-nhan/flow-canhan.module').then(m => m.FlowCanhanModule)
			},

		
			{
				path: 'mymessenger',
				loadChildren: () => import('../app/views/pages/MyChat/mychat.module').then(m => m.MychatModule)
			},
			{
				path: 'mynews',
				loadChildren: () => import('../app/views/pages/home/media/MediaView/media.module').then(m => m.MediaModule)
			},
			 {
				path: 'Administrator',
				loadChildren: () => import('../app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('../app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'home', pathMatch: 'full'},// load lên trang đầu tiên
			{path: '**', redirectTo: 'home', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'home', pathMatch: 'full'},
	
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
