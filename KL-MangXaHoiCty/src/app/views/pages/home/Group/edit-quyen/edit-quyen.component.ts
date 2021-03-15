import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { MessageType, LayoutUtilsService } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserGroupModel } from '../group_user.model';

@Component({
  selector: 'kt-edit-quyen',
  templateUrl: './edit-quyen.component.html',
  styleUrls: ['./edit-quyen.component.scss']
})
export class EditQuyenComponent implements OnInit {
  quyen: any = {};
  selectedd:string;
 selected = '';
  viewLoading:boolean=false;
  public groupFilterCtrl: FormControl = new FormControl();
  id_group = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<EditQuyenComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:GroupService,
    private auth:AuthService,
    private layoutUtilsService:LayoutUtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

	closeDilog()
			{
			this.dialogRef.close();
			}

 
item_user_group_admin():UserGroupModel
{
  const item = new UserGroupModel();

  if(this.selected==='option1')
  {
    item.Id_Group=this.quyen.Id_group;
    //    item.id_user=this.id_user;
      item.quyen_group=true;
  }
  else

  {
    item.Id_Group=this.quyen.Id_group;
    //    item.id_user=this.id_user;
      item.quyen_group=false;
  }

     
  
  this.changeDetectorRefs.detectChanges();
  return item;
}
Adduser(item:UserGroupModel,withBack:boolean){

this._service.Update_quyen_Memmber(this.quyen.id_user,item).subscribe(res=>{
  if (res && res.status === 1) {
  
     }
     else {
     this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
     }
})

}


      Group_user_Insert()
      {
        

        
        let it_gr_u=this.item_user_group_admin();
        this.Adduser(it_gr_u,false);
        

        
      }

onSubmit() {
  
  this.Group_user_Insert();
  this.closeDilog();

}
// loadTTuser()
// {
// 	this.auth.getProFileUsers_change(this.id_user).subscribe(res =>{	

// 		this.listTT_user=res.Data;
// 		this.changeDetectorRefs.detectChanges();
		
// 	})
// }


  ngOnInit() {
   
    this.quyen = this.data;
   
    if(this.quyen.quyen_group==true)
    {
      this.selected='option1'
    }
    else
    {
      this.selected='option2'
    }
    this.changeDetectorRefs.detectChanges();
    this.groupFilterCtrl.setValue('');

   
  }

}
