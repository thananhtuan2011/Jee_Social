import { LayoutUtilsService, MessageType } from './../../../../../../core/_base/crud/utils/layout-utils.service';
import { AuthService } from './../../../../../../core/auth/_services/auth.service';
import { TokenStorage } from './../../../../../../core/auth/_services/token-storage.service';
import { MediaService } from './../../media.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EditMediaComponent } from './edit-media/edit-media.component';

@Component({
  selector: 'kt-view-media-dialog',
  templateUrl: './view-media-dialog.component.html',
  styleUrls: ['./view-media-dialog.component.scss']
})
export class ViewMediaDialogComponent implements OnInit {

  item:any[]=[];
  id_user:number;
  listmedia:any[]=[];
  listTT_user:any[]=[];
  constructor(

    private _service: MediaService,
    private authService:AuthService,
		private tokenStore:TokenStorage,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private _services:MediaService,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
  ) { }
  Update_Media(item,index,indexc=-1) {
    var data = Object.assign({}, item);
    // var data = Object.assign({}, item);
    const dialogRef = this.dialog.open(EditMediaComponent, { data:data,
      
      width: '700px' ,
      height: '500px'});
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        item.media = res.media
        this.LoadListData();
        this.changeDetectorRefs.detectChanges();
      }
      else
      {
        this.LoadListData();
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
DeleteMedia(id_media:number){
const _title = this.translate.instant('Xóa Tin');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
	
    this._services.DeleteMedia(id_media).subscribe(res =>{
      this.LoadListData();
      this.changeDetectorRefs.detectChanges();
  

						
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

		 // xóa like trong bài đăng

	
  getCurrentUser() {
  
    this.tokenStore.getUserData().subscribe(res =>{
      this.item= res;
      this.id_user=res.ID_user;
  
      
    });
  }
  
  LoadListData() 
  {
    this._service.getlistMyMedia(this.id_user).subscribe(res =>{
      this.listmedia=res.Data;
      this.changeDetectorRefs.detectChanges();
    })
  }
  loadTTuser()
  {
    this.authService.getProFileUsers_change().subscribe(res =>{	

      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
     
    })
  }


  ngOnInit() {
    this.getCurrentUser();
    this.LoadListData();
  }
  

}
