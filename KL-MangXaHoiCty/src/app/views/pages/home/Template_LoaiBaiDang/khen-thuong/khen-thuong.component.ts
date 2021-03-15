import { ThongbaoService } from './../../Bai-Dang/_Services/thongbao.service';
import { ThongBaoModel } from './../../Bai-Dang/Model/ThongBao.model';
import { GroupService } from './../../Bai-Dang/_Services/group.service';
import { LayoutUtilsService, MessageType } from './../../../../../core/_base/crud/utils/layout-utils.service';
import { SharedService } from './../../../../../core/auth/_services/sharedata.service';
import { TokenStorage } from './../../../../../core/auth/_services/token-storage.service';
import { BaiDangModel } from './../../Bai-Dang/Model/Bai-dang.model';
import { AuthService } from './../../../../../core/auth/_services/auth.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaiDangService } from '../../Bai-Dang/_Services/bai-dang.service';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { trim } from 'lodash';

@Component({
  selector: 'kt-khen-thuong',
  templateUrl: './khen-thuong.component.html',
  styleUrls: ['./khen-thuong.component.scss']
})
export class KhenThuongComponent implements OnInit {
  item:any[]=[];
  listkt:any[]=[];
  data_user:any;
  test:any;
  congkhai='Công Khai';
  item_user=[];
  tam:string
  user_tam: any[] = [];
  listUser:Observable<any[]>;
  userCtrl=new FormControl();
  removable = true;
  selectedTab: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
	visible = true;
  selectable = true;
  id:number;
  id_loaibaidang:number;
  id_user:number;
  id_kt:number;
  noidung:string='';
  tieude_kt:string;
  tieude:string="";
  title:string;
  selectedd:number;
  id_group = new FormControl('');

  public groupFilterCtrl: FormControl = new FormControl();

list_group:any[]=[];
	
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    public dialogRef: MatDialogRef<KhenThuongComponent>,
    private bdservices:BaiDangService,
    private _authservice:AuthService,
    private dialogRef_all:MatDialogRef<KhenThuongComponent>,
    private _dbservices:BaiDangService,
    private tokenStore:TokenStorage,
    private changeDetectorRefs: ChangeDetectorRef,
    private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    private _service_gr:GroupService,
    private _service_thongbao:ThongbaoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

   
   }

   
 Item_thongbao(): ThongBaoModel {
  const item = new ThongBaoModel();


  
       item.title="Đã tạo khen thưởng nhân viên :"+this.title;
      item.create_tb_by=this.id_user;
  
  this.changeDetectorRefs.detectChanges();
  return item;
}


// test(){
// 	this.datainput.push({ data:""});
// 	console.log('Data',this.datainput)
// }

// Bắt đầu phần comment

AddThongbao(item:ThongBaoModel,withBack:boolean){

    this._service_thongbao.InsertThongBao(item).subscribe(res=>{
      if (res && res.status === 1) {
       
       
        // this.dialogRef.close();
       
        
           }
           else {
             this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
           }
    })
}

      ThongBaotInsert()
      {

        let it_cmt=this.Item_thongbao();
         this.AddThongbao(it_cmt,false);
      
        
      }


  statusClass = 'praise';

  // setActiveClass(){
  //   this.statusClass = 'praise active';
  // }
  
  ChangesChose()
  {
   
      this.statusClass = 'praise';
   
    
  }

  toggle = true;
status = 'Enable'; 

enableDisableRule(job) {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
}

private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

private _filterStates(value: string): any {
  debugger
 
  //	const filterValue = value.toLowerCase();
  const filterValue = this._normalizeValue(value);
  let tam=JSON.parse(this.data_user);
 this.test= this.data_user.filter(state => this._normalizeValue(state.hoten).includes(filterValue));
  return this.data_user=this.test.slice();
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

removeuser(id: number): void {

 
 
  let index = -1;
  this.data_user.subscribe(data => {
    index = data.findIndex(res => res.ID_NV == id);
  })

  if(index >= 0){
    
     let data = this.listUser;
    if(data){
      this.data_user= this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        // map(state => state ? this._filterStates(state) : this.listUser.slice())
      );
    this.changeDetectorRefs.detectChanges();
    }
  }
      this.data_user
      .pipe(
      	map( this.data_user.splice(index, 1))
        

    
        
      );
    
  
}



selected(event: MatAutocompleteSelectedEvent): void {
            //  debugger
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

    console.log(this.user_tam);

    this.removeuser(event.option.value);
  // this.userInput.nativeElement.value = '';
  // this.userCtrl.setValue(null);

  // let obj = this.user_tam.find(x => x.ID_type == event.option.value);
  //this.deleteHT1(obj);
  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
 
 
  
  }
}











  loadListKhenThuong(){
  this.bdservices.GetDSKhenThuong().subscribe(res=>{
      this.listkt=res.data;
      console.log(res.Data);
  })

  

  }
  getID_KT(id_:number)
  {
      this.id_kt=id_;

  }

  ItemBaiDang(): BaiDangModel {
		//  debugger
	
	
		//const controls = this.itemForm.controls;
		
		const item = new BaiDangModel();
    
      // Users: Array<BaiDangUser> = [];	// user.ID_User = this.item.ID_User;

      // var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
        // let myDate=new Date(this.lastUpdated);
        // let dateString =this.lastUpdated;
          // let myDate=new Date('');
     
          item.id_loaibaidang=this.id_loaibaidang;
          for(let i=0;i<this.user_tam.length;i++){
         
          
            this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
        
              this.title=trim(this.tieude,",");
            
  
  
          }
          debugger
           item.title=this.title;
           item.NoiDung=this.noidung;
          item.typepost='';
           item.Id_Group=this.id_group.value;
         // item.CreatedBy=this.id_user;
          // item.id_group=null;
          // item.UpdateDate=null;
          item.id_khenthuong= this.id_kt;
         // item.UpdateBy=null
        
		this.changeDetectorRefs.detectChanges();
		return item;
	}

  AddBaiDang(item: BaiDangModel, withBack: boolean) {
    // this.loadingAfterSubmit = true;
    // debugger
    if(this.id_group.value=="Công Khai"||this.id_group.value==0)
    {
		this._dbservices.InsertBaiDang_KT(item).subscribe(res => {
			if (res && res.status === 1) {
       this.dialogRef.close();
      //  this.dataSource.loadListBaiDang();
     
        
			}
			else {
				this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			}
    });
  }
  else
  {
    this._dbservices.InsertBaiDang_KT(item).subscribe(res => {
			if (res && res.status === 1) {
       this.dialogRef.close();
      //  this.dataSource.loadListBaiDang();
     
        
			}
			else {
				this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			}
    });
  }
  }
 

 

  submit()
  {
    // debugger
    this.id_loaibaidang=this.data.id_loaibaidang;
    let ItemBd=this.ItemBaiDang();
    this.AddBaiDang(ItemBd,false);
    //this.ThongBaotInsert();
    // this.reload.loadDataList();
    // this._BaiDangViewComponent.change();
    this.dialogRef_all.close();
    this.changeDetectorRefs.detectChanges();

  }



  closeDilog()
  {
    this.dialogRef.close();
  }
  LoadData() {
    // debugger
    this.tokenStore.getUserData().subscribe(res =>{
      this.item= res;
      this.id_user=res.ID_user;
    });
  }

  LoadListGroup(){
    this._service_gr.getlistgroup().subscribe(res =>{
          this.list_group=res.data;
    })
  }
  
getDataShare(){
 this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)

 this.selectedd=Number(this.tam);

}
 

  ngOnInit() {
    this.getDataShare();
    this.groupFilterCtrl.setValue('');
    this.LoadData();
    this.LoadListGroup();

    this.loadListKhenThuong();

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
