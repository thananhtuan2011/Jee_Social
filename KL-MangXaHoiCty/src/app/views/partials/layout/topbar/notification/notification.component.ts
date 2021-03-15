import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { ThongbaoService } from './../../../../pages/home/Bai-Dang/_Services/thongbao.service';
import { environment } from './../../../../../../environments/environment';
import { LoggedInUser } from './../../../../pages/home/loggedin.user';
 import { SignalrService } from './../../../../pages/home/signalr.service';
import { AuthService } from './../../../../../core/auth/_services/auth.service';

// Angular
import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['notification.component.scss']
})
export class NotificationComponent  implements OnInit {
	id_user_current:number;
	item:any[]=[];
	today:string;
	list_count:any;
	count:any;
	listthongbao:any[]=[];
	public user: LoggedInUser;
	public baseFolder: string = environment.Apiroot;
	public canSendMessage: Boolean;
	public announcements: any[];
	// Show dot on top of the icon
	@Input() dot: string;

	// Show pulse on icon
	@Input() pulse: boolean;

	@Input() pulseLight: boolean;

	// Set icon class name
	@Input() icon = '';
	@Input() iconType: '' | 'success';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() type: 'brand' | 'success' = 'success';

	/**
	 * Component constructor
	 *
	 * @param sanitizer: DomSanitizer
	 */
	constructor(private sanitizer: DomSanitizer,
					private auth:AuthService,
					// private utilityService: UtilityService,
					 private _signalRService: SignalrService,
					// private _dataService: DataService,
					private changeDetectorRefs: ChangeDetectorRef,
					private _ngZone: NgZone,
					private _services_tb:ThongbaoService,
					private layoutUtilsService: LayoutUtilsService,
					private tokenStore:TokenStorage,
	private translate: TranslateService,
		
		) {
			this.subscribeToEvents();
			// this can check for conenction exist or not. 
			this.canSendMessage = _signalRService.connectionExists;
	}

	private subscribeToEvents(): void {

		
		// this.listthongbao = [];
	
		// if connection exists it can call of method.  
		this._signalRService.connectionEstablished.subscribe(() => {
		  this.canSendMessage = true;
		  this.changeDetectorRefs.detectChanges();
		});
	
		// finally our service method to call when response received from s
		// erver event and transfer response to some variable to be shwon on the browser.  
		this._signalRService.announcementReceived.subscribe((announcement: any) => {
		  this._ngZone.run(() => {
			console.log('List thông báo:',this.listthongbao );
			
			//this.list_messenger.push(announcement[0]);
				// this.listthongbao = announcement;
				this.listthongbao.push(announcement);
				this.loadthongBao();
				this.changeDetectorRefs.detectChanges();

		  });
		});
	  }

	  DeleteTB(id_tb:number)
	  {
		  this._services_tb.DeleteThongBao(id_tb).subscribe(res=>{
			this.loadthongBao();
			this.changeDetectorRefs.detectChanges();
		  })
		 
	  }

	  UpdateTinhTrangThongBao(id_thongbao:number){
		this._services_tb.UpdateThongBao(id_thongbao).subscribe(res=>{
			this.loadthongBao();
		
			this.changeDetectorRefs.detectChanges();
		  })
		 
	  }
	

	  getCurrentUser() 
	  {
		this.tokenStore.getUserData().subscribe(res =>{
		 
			this.item= res;
			this.id_user_current=res.ID_user;
	   
	
		});
	}
	Count_TB()
	{ this._services_tb.getCountTB().subscribe(res=>{
		this.list_count=res.data;
		this.count=	this.list_count.soluong;
		console.log(this.count);
		this.changeDetectorRefs.detectChanges();
	  })
		
	}
  
	ngOnInit() {
		this.getCurrentUser() ;

		// this.user = this.auth.getLoggedInUser();
		this.loadthongBao();
		this.Count_TB();
		//  this.today = '2020-12-26 1:00:18  ';
		
	}
		

	loadthongBao()
	{
		this.auth.getAllThongBao().subscribe((res:any)=>{
			this.listthongbao=res.data;
			console.log('thongbao',this.listthongbao);
			this.announcements = [];
			this.changeDetectorRefs.detectChanges();
	
		})
		this.Count_TB();
	}

	backGroundStyle(): string {
		if (!this.bgImage) {
			return 'none';
		}

		return 'url(' + this.bgImage + ')';
	}

	UpdateReadAllThongBao()
	{
		this._services_tb.DeleteAllThongBao().subscribe(res=>{
				this.loadthongBao();
				this.changeDetectorRefs.detectChanges();
			  })
	}
		DeleteAllThongBao()
		{
			// this._services_tb.DeleteAllThongBao(this.id_user_current).subscribe(res=>{
				
			// 	this.changeDetectorRefs.detectChanges();
			//   })

			  {
				const _title = this.translate.instant('Đánh dấu đã đọc tất cả thông báo');
				const _description = this.translate.instant('Xác nhận?');
				const _waitDesciption = this.translate.instant('Dữ liệu đang được xử lý');
				const _deleteMessage = this.translate.instant('Xóa thành công !');
		
				const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _description, _waitDesciption);
				dialogRef.afterClosed().subscribe(res => {
					if (!res) {
						return;
			}
			//debugger
		
					this._services_tb.DeleteAllThongBao().subscribe(res => {
						this.loadthongBao();
	
							
						this.layoutUtilsService.OffWaitingDiv();
						if (res && res.status === 1) {
							this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
						}
						else {
							this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
						}
					
						
					});
				});
			 }
		}
		

}
