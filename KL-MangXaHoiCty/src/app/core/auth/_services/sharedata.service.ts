import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private sharedData= new BehaviorSubject('');
  private pass= new BehaviorSubject('');// chú ý lấy
  private Id_LoaiBaiDang= new BehaviorSubject('');
  private dl_hoten=new BehaviorSubject('');
  private id_phong=new BehaviorSubject('');
  private dl_group=new BehaviorSubject('');
  id_group=this.dl_group.asObservable();

  private id_userchat=new BehaviorSubject('');
  id_userbin = this.id_userchat.asObservable();//chú ý 
  passbind = this.pass.asObservable();//chú ý 
  ID=this.Id_LoaiBaiDang.asObservable();
//   sharedData$: Observable<any> = this.sharedData.asObservable();
  currentMessage = this.sharedData.asObservable();

  passbindlogin = this.pass.asObservable();//chú ý 
  currentMessagelogin = this.sharedData.asObservable();
  datahoten=this.dl_hoten.asObservable();

  id_phongban=this.id_phong.asObservable();

  // checkdata = this.pass.asObservable();//chú ý 
  constructor() { }

  setData_idPhong(updatedData) {
    this.id_phong.next(updatedData);
  }

  setData_id_userchat(updatedData) {
    this.id_userchat.next(updatedData);
  }
  setData_idgroup(updatedData) {
    this.dl_group.next(updatedData);
  }

 

 

// set email
  setData(updatedData:string) {
    this.sharedData.next(updatedData);
  }
  //set pass
  setDataPass(updatedData:string) {
    this.pass.next(updatedData);
  }

  setId_LoaiBaiDAng(updatedData) {
    this.Id_LoaiBaiDang.next(updatedData);
  }
  set_dl_hoten(updatedData)
  {
    this.dl_hoten.next(updatedData);
  }

  setDatacheck(updatedData:boolean) {
    this.pass.next(updatedData.toString());
  }
}