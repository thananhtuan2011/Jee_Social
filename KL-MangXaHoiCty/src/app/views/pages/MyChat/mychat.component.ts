import { AuthService } from './../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { MychatService } from './mychat.service';

@Component({
  selector: 'kt-mychat',
  templateUrl: './mychat.component.html',
  styleUrls: ['./mychat.component.scss']
})
export class MychatComponent implements OnInit {

  constructor(
    private mychat_serviecs:MychatService,
    private tokenStore:TokenStorage,
    private authservice: AuthService,
    private changeDetectorRefs: ChangeDetectorRef,
    private renderer: Renderer2

  ) { }
  id_user_current:number;
  listTT_user:any[]=[];
  item:any[]=[];

  list_userchat:any[]=[];

  LoadListUserChat()
  {
        this.mychat_serviecs.GetListUserChat(this.id_user_current).subscribe(res=>{
          this.list_userchat=res.data;
          console.log('mess',this.list_userchat);
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
  
    loadTTuser()
    {
      this.authservice.getProFileUsers_change().subscribe(res =>{	
    
      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
      
      })
    }
  ngOnInit() {
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 1000);
    
    
    this.getCurrentUser();
    this.loadTTuser();
    this.LoadListUserChat();
  }

}
