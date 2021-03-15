import { AuthService } from './../../../../../core/auth/_services/auth.service';

import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaiDangService } from '../_Services/bai-dang.service';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { BaiDangModel } from '../Model/Bai-dang.model';
import { trim } from 'lodash';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'kt-khen-thuong-edit',
  templateUrl: './khen-thuong-edit.component.html',
  styleUrls: ['./khen-thuong-edit.component.scss']
})
export class KhenThuongEditComponent implements OnInit {
  removable = true;
  selectedTab: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
	visible = true;
  selectable = true;
  khenthuong: any = {};
  data_user:any;
id_user:number;
id_baidang:number;
item:any[]=[];
listkt:any[]=[];
  userCtrl=new FormControl();
  listUser:Observable<any[]>;
  viewLoading:boolean=false;
  tieude:string="";
  noidung:string;
  user_tam: any[] = [
    
    
  ];
 id_kt:number;

  // title_user = new FormControl('');
  title_user:string;
  title:string;
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    public dialogRef: MatDialogRef<KhenThuongEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    // private _service_cmt:CommentService,
    private _service:BaiDangService,
    private _authservice:AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDilog(data=undefined)
{
    this.dialogRef.close(data);
}
getID_KT(id_:number)
{
    this.id_kt=id_;

}

ItemBaiDang(): BaiDangModel {
  //  debugger


  //const controls = this.itemForm.controls;
  
  const item = new BaiDangModel();
  
    
        for(let i=0;i<this.user_tam.length;i++){
         
          
          this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
      
            this.title=trim(this.tieude,",");
          


        }
    
        item.Id_BaiDang=this.id_baidang;
        item.title=this.title;
        item.NoiDung=this.noidung;
        item.typepost='';
        item.id_khenthuong=this.id_kt;
        // item.CreatedDate=myDate;
        // item.CreatedBy=this.id_user;
        // item.i=null;
        // item.UpdateDate=this.id_user;;
        item.UpdateBy=this.id_user;
      
  this.changeDetectorRefs.detectChanges();
  return item;
}

AddBaiDang(item: BaiDangModel, withBack: boolean) {
  // this.loadingAfterSubmit = true;
  // debugger
  this._service.UpdateBaiDang(item).subscribe(res => {
    if (res && res.status == 1) {
    
      this.closeDilog(res.data);
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}




submit()
{
   
  let ItemBd=this.ItemBaiDang();
  this.AddBaiDang(ItemBd,false);

  // this.reload.loadDataList();
  // this._BaiDangViewComponent.change();
 
  this.changeDetectorRefs.detectChanges();

}
// onSubmit() {
//   debugger
//   // this._service.UpdateBaiDang(this.chaodonthanhvien).subscribe(res => {
//   //   if (res && res.status == 1) {
//   //     this.closeDia(res.data);
//   //   }
//   // });
// }
 
private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

private _filterStates(value: string): any[] {
  //debugger
  //	const filterValue = value.toLowerCase();
  const filterValue = this._normalizeValue(value);
  return this.data_user.filter(state => this._normalizeValue(state.hoten).includes(filterValue));
}



add(event: MatChipInputEvent): void {
  // Add fruit only when MatAutocomplete is not open
  // To make sure this does not conflict with OptionSelected Event
  if (!this.matAutocomplete.isOpen) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.user_tam.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }
}
// xóa dữ liệu trong mảng user_tam
remove(user: string): void {
  const index = this.user_tam.indexOf(user);

  if (index >= 0) {
    this.user_tam.splice(index, 1);
  }
}



selected(event: MatAutocompleteSelectedEvent): void {
             // debugger
    let obj = this.user_tam.find(x => x.hoten == event.option.viewValue);
    if(obj)
    {
        alert('Vui lòng chọn nhân viên khác !')
    }
    else{

    
  this.user_tam.push(
   
    {
      
      // ID_NV:this.id_nv.value,
				hoten:event.option.viewValue,
    })

    console.log('user_tam_edit:',this.user_tam);

  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
 
 
  
  }
}
LoadData_current_user() {
  // debugger
  this.tokenStore.getUserData().subscribe(res =>{
    this.item= res;
    this.id_user=res.ID_user;
  });
}

statusClass = 'praise';
  ChangesChose()
  {
     
      this.statusClass = 'praise';
   
    
  }

  loadListKhenThuong(){
    this._service.GetDSKhenThuong().subscribe(res=>{
        this.listkt=res.data;
    })
  
  }
 
  ngOnInit() {
 
    this.loadListKhenThuong();
    this.LoadData_current_user();
    //  this.user_tam.push(this.chaodonthanhvien.title.value);
    //console.log('Chao don thanh vien:',this.chaodonthanhvien),
    
    this.khenthuong = this.data;
    this.id_baidang=this.khenthuong._item.Id_BaiDang;
    this.title_user=this.khenthuong._item.title;
    this.noidung=this.khenthuong._item.NoiDung;
    this.id_kt=this.khenthuong._item.KhenThuong[0].id_khenthuong;
    
  this.user_tam.push(
   
    {
      
     
				hoten:this.title_user,
    })

    this.changeDetectorRefs.detectChanges();


    this._authservice.getAllNhanvien().subscribe((res=>{
      
        this.data_user=res.data;
     
        this.listUser= this.userCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.data_user.slice())
        
        );
      this.changeDetectorRefs.detectChanges();
     
  
    
        }))
  
    
  }
}
