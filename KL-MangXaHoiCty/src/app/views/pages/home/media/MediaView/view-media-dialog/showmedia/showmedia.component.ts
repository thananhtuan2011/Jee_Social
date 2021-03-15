import { MediaDetailComponent } from './../../../media-detail/media-detail.component';
import { MediaService } from './../../../media.service';
import { TokenStorage } from './../../../../../../../core/auth/_services/token-storage.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'kt-showmedia',
  templateUrl: './showmedia.component.html',
  styleUrls: ['./showmedia.component.scss']
})
export class ShowmediaComponent implements OnInit {
  @Input() id_media: any;
  id_user:number
  list_media:any[]=[];
  constructor(
    private route:ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef,
    private _services:MediaService,
    private tokenStore:TokenStorage,
    private dialog:MatDialog,
  ) { }

  
  GetCurrentUser() {
	
    this.tokenStore.getUserData().subscribe(res =>{
    //   this.item= res;
      this.id_user=res.ID_user;
    });
     
    }

    LoadlistData()
    {
        this._services.getlistMyMediaDetail(this.id_media).subscribe(res =>{

            this.list_media=res.data;
            this.changeDetectorRefs.detectChanges();
        })
    }
    ViewDetail()
    {
      const dialogRef = this.dialog.open(MediaDetailComponent, {
		
        width: '700px' ,
        height: '500px'});
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
        
          this.LoadlistData();
          this.changeDetectorRefs.detectChanges();
        }
        else
        {
          this.LoadlistData();
          this.changeDetectorRefs.detectChanges();
        }
      });
   }
        
    

 
  ngOnInit() {
    

    this.route.params.subscribe(params => {
    
      this.id_media =+params.id_media;
    this.changeDetectorRefs.detectChanges();
    this.GetCurrentUser();

    this.LoadlistData();

   
    
    
    });
  }

}
