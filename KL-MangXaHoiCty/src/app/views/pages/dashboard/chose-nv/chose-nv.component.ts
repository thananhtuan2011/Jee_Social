import { AuthService } from './../../../../core/auth/_services/auth.service';
import { LayoutUtilsService } from './../../../../core/_base/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'kt-chose-nv',
  templateUrl: './chose-nv.component.html',
  styleUrls: ['./chose-nv.component.scss']
})
export class ChoseNvComponent implements OnInit {

 	// Public properties
   tam:string;
   id_gr:number;
   @Input() options: any = {
     showSearch: true,//hiển thị search input hoặc truyền keyword
     keyword: '',
     data: []
   };
   @Output() ItemSelected = new EventEmitter<any>();
   @Output() IsSearch = new EventEmitter<any>();
 
   listUser: any[] = [];
   public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
   public userFilterCtrl: FormControl = new FormControl();
   constructor(
     private FormControlFB: FormBuilder,
     public dialog: MatDialog,
     private layoutUtilsService: LayoutUtilsService,
     public service:DashboardService ,
  
     private changeDetectorRefs: ChangeDetectorRef) { }
 
   /**
    * On init
    */
   
   getData(){
       
    //  //debugger
    //  this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)
    //  this.id_gr=Number(this.tam);
   
   
     }
   
   ngOnInit() {
     
     this.userFilterCtrl.valueChanges
       .pipe()
       .subscribe(() => {
         this.filterUsers();
       });
       
    // console.log('User:',this.filteredUsers)
   }
   ngOnChanges() {
     this.getData();
     this.userFilterCtrl.setValue('');
     this.listUser = [];
 
     if (this.options.showSearch == undefined)
       this.options.showSearch = true;
     if (this.options != undefined) {
       if (this.options.data) {
         this.listUser = this.options.data;
         this.filterUsers();
         this.changeDetectorRefs.detectChanges();
       } else {
       //	debugger
         this.service.GetNV_CreateUser().subscribe(res => {
           if (res && res.status === 1) {
             this.listUser = res.Data;
             // mảng idnv exclude
             if (this.options.excludes && this.options.excludes.length > 0) {
               var arr = this.options.excludes;
               this.listUser = this.listUser.filter(x => !arr.includes(x.ID_user));
             }
             this.filterUsers();
             this.changeDetectorRefs.detectChanges();
           };
         });
       }
     }
     if (!this.options.showSearch)
       this.filterUsers();
 
   }
   protected filterUsers() {
     if (!this.listUser) {
       return;
     }
 
     let search = !this.options.showSearch ? this.options.keyword : this.userFilterCtrl.value;
     if (!search) {
       this.filteredUsers.next(this.listUser.slice());
       return;
     } else {
       search = search.toLowerCase();
     }
     // filter the banks
     if (search[0] == '@') {
       this.filteredUsers.next(
         this.listUser.filter(bank => ("@" + bank.hoten.toLowerCase()).indexOf(search) > -1)
       );
     }
     else {
       this.filteredUsers.next(
         this.listUser.filter(bank => bank.hoten.toLowerCase().indexOf(search) > -1)
       );
     }
   }
   select(user) {
     this.ItemSelected.emit(user)
   }
   stopPropagation(event) {
     this.IsSearch.emit(event)
   }
}
