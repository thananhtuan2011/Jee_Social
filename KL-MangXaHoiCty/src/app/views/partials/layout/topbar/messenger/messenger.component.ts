import { SignalrService } from './../../../../pages/home/signalr.service';
import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { MychatService } from './../../../../pages/MyChat/mychat.service';
import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'kt-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit,AfterViewInit {

	
	Test:any[];

	Acti:any[] = [
	  {id: 1, acti: 'true'},
  ];
  
  public canSendMessage: Boolean;
  	// Public properties

	// Set icon class name
	@Input() icon = '';

  @Input() pulse: boolean;

  @Input() pulseLight: boolean;
  
	@Input() iconType: '' | 'warning';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() gridNavSkin: 'light' | 'dark' = 'light';

	id_user_current:number;
	listTT_user:any[]=[];
	item:any[]=[];
	searchText;
	list_userchat:any[]=[];
	constructor(

		private mychat_serviecs:MychatService,
		private tokenStore:TokenStorage,
		private authservice: AuthService,
		private changeDetectorRefs: ChangeDetectorRef,
		private _signalRService: SignalrService,
		private _ngZone: NgZone,

	) {
		this.subscribeToEventsMessenger();
		// this can check for conenction exist or not. 
		this.canSendMessage = _signalRService.connectionExists;
   
	}

	private subscribeToEventsMessenger(): void {
			
			this.list_userchat = [];
		  
			// if connection exists it can call of method.  
			this._signalRService.connectionEstablished.subscribe(() => {
			  this.canSendMessage = true;
			});
		  
			// finally our service method to call when response received from s
			// erver event and transfer response to some variable to be shwon on the browser.  
			this._signalRService.ReceivedMessenger.subscribe((announcement: any) => {
			  this._ngZone.run(() => {
		
			  // console.log('List thông báo:',this.listthongbao );
			  this.list_userchat.push(announcement[0]);
				// this.list_messenger = announcement;
				// console.log('List messenger signlar chat user',this.list_userchat );
			this.LoadListUserChat();
				this.changeDetectorRefs.detectChanges();
				
		
			  });
			});
			}


			
	loadTTuser()
    {
      this.authservice.getProFileUsers_change().subscribe(res =>{	
    
      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
      
      })
    }

  LoadListUserChat()
  {
        this.mychat_serviecs.GetListUserChat(this.id_user_current).subscribe(res=>{
          this.list_userchat=res.data;
        
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
	ngAfterViewInit(): void {
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.getCurrentUser();
		this.loadTTuser();
		this.LoadListUserChat();
	}

	onSVGInserted(svg) {
		svg.classList.add('kt-svg-icon', 'kt-svg-icon--success', 'kt-svg-icon--lg');
	}
}
