import { TokenStorage } from './../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MychatService } from '../mychat.service';

@Component({
  selector: 'kt-edit-mess',
  templateUrl: './edit-mess.component.html',
  styleUrls: ['./edit-mess.component.scss']
})
export class EditMessComponent implements OnInit {
  chat: any = {};
  id_user_current:number;
  item:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<EditMessComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:MychatService,
    private tokenStore:TokenStorage,

    // private _service_cmt:CommentService,

 @Inject(MAT_DIALOG_DATA) public data: any


  ) { }

  closeDia(data = undefined)
  {
      this.dialogRef.close(data);
  }
  


  UpdateMess()
  {
    this._service.Updatechat(this.chat).subscribe(res => {
      if (res && res.status == 1) {
        this.closeDia(res.data);
      }
    });
  
  }

  getCurrentUser() 
	{
	  this.tokenStore.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.ID_user;
	 
  
	  });
  }
    ngOnInit() {
      this.getCurrentUser();
      this.chat = this.data;
     
      this.changeDetectorRefs.detectChanges();
      
    }


}
