import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { MychatService } from './../../../MyChat/mychat.service';
import { DeletechatComponent } from './../../../MyChat/deletechat/deletechat.component';

import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'kt-delete-chat-user',
  templateUrl: './delete-chat-user.component.html',
  styleUrls: ['./delete-chat-user.component.scss']
})
export class DeleteChatUserComponent implements OnInit {

  chat: any = {};
  id_user_current:number;
  item:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<DeletechatComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private services:MychatService,
    private tokenStore:TokenStorage,

    // private _service_cmt:CommentService,

 @Inject(MAT_DIALOG_DATA) public data: any


  ) { }

  closeDia(data = undefined)
  {
      this.dialogRef.close(data);
  }
  // onSubmit() {
    
  //   this._service_cmt.update_comment(this.comment).subscribe(res => {
  //     if (res && res.status == 1) {
  //       this.closeDia(res.data);
  //     }
  //   });
  // }

  DeleteMess()
  {
    this.services.deleteMess(this.id_user_current, this.chat).subscribe(res=>{
     this.closeDia();
    })
  }
  

  DeleteForeverMess()
  {
    this.services.deleteForeverMess(this.chat).subscribe(res=>{
     this.closeDia();
    })
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
