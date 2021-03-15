import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { ThongdiepService } from '../thongdiep.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { SuaThongDiepComponent } from '../sua-thong-diep/sua-thong-diep.component';
import { SignalrService } from '../../signalr.service';
import { LuotXemModel } from '../luotxem.model';


@Component({
  selector: 'kt-thong-diep-view',
  templateUrl: './thong-diep-view.component.html',
  styleUrls: ['./thong-diep-view.component.scss']
})
export class ThongDiepViewComponent implements OnInit {
  id_user:number;
  id_router_thongdiep:number;

	public canSendMessage: Boolean;
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
  
  }
  constructor(

    private _services:ThongdiepService,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
private tokenStore:TokenStorage,
private dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
private _signalRService:SignalrService,
private _ngZone: NgZone,

  ) { 

    this.subscribeToEvents();
			// this can check for conenction exist or not. 
			this.canSendMessage = _signalRService.connectionExists;

  }

  listTD:any[]=[];

  loadListThongDiep()
  {
    this._services.getDSThongDiep().subscribe(res=>{
      this.listTD=res.data;
            
		this.changeDetectorRefs.detectChanges();
    })
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
		this._signalRService.ReceivedThongDiep.subscribe((announcement: any) => {
		  this._ngZone.run(() => {
			console.log('List thongdiep:',this.listTD );
			
			//this.list_messenger.push(announcement[0]);
        // this.listthongbao = announcement;
        debugger
				this.listTD.push(announcement);
				this.loadListThongDiep();
				this.changeDetectorRefs.detectChanges();

		  });
		});
	  }

  GetCurrentUser() {
    // debugger
    this.tokenStore.getUserData().subscribe(res =>{
    //   this.item= res;
      this.id_user=res.ID_user;
    });
     
    }
    DeleteThongDiep(id_td:number){
      
      const _title = this.translate.instant('Xóa Thông Điệp CEO');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
	

    this._services.DeleteThongDiep(id_td).subscribe(res=>{
      
              
      this.changeDetectorRefs.detectChanges();
        this.loadListThongDiep();
						
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

    Update_ThognDiep(item,index,indexc=-1) {
      var data = Object.assign({}, item);
      // var data = Object.assign({}, item);
      const dialogRef = this.dialog.open(SuaThongDiepComponent, { data:data,
        
        width: '500px' });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          item.thongdiep = res.thongdiep
          this.loadListThongDiep();
          this.changeDetectorRefs.detectChanges();
        }
        else
        {
          this.loadListThongDiep();
          this.changeDetectorRefs.detectChanges();
        }
      });
    }

     submit(id_td:number)
     {
      this.id_router_thongdiep=id_td;
       this.LuotXemInsert();
      
     }
 Item_luotxem(): LuotXemModel {
 
  const item = new LuotXemModel();
 
   
   
        item.id_thongdiep=this.id_router_thongdiep;
        item.id_user=this.id_user;
     
   
   this.changeDetectorRefs.detectChanges();
   return item;
 }
 
 
 // test(){
 // 	this.datainput.push({ data:""});
 // 	console.log('Data',this.datainput)
 // }
 
 // Bắt đầu insert lượt xem
 
 Addluotxem(item:LuotXemModel,withBack:boolean){
 
     this._services.Insertluotxem(item).subscribe(res=>{
       if (res && res.status === 1) {
        
        
         // this.dialogRef.close();
        
         
            }
            else {
              this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
            }
     })
 }
 
       LuotXemInsert()
       {
 
         let it_lx=this.Item_luotxem();
          this.Addluotxem(it_lx,false);
       
         
       }
 
   

 

  ngOnInit() {
    this.loadListThongDiep();
    this.GetCurrentUser();
  }
 
}
