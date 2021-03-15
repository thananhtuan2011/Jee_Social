import { AuthService } from './../../../core/auth/_services/auth.service';

import { environment } from './../../../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable(

)
export class SignalrService {

 
  // Declare the variables  
  private proxy: any;
  private proxyName: string = 'mangxahoi';
  private connection: any;
  // create the Event Emitter  
  public announcementReceived: EventEmitter<any>;
  public ReceivedMessenger: EventEmitter<any>;
  public ReceivedThongDiep: EventEmitter<any>;
  public cmt: EventEmitter<any>;
  public CheckOnline: EventEmitter<any>;
  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;

  constructor(
    
    // private _authenService: AuthenService
    private auth:AuthService

    
    ) {
     // debugger
    // Constructor initialization  
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.announcementReceived = new EventEmitter<any>();
    this.CheckOnline = new EventEmitter<any>();
    this.ReceivedMessenger=new EventEmitter<any>();
    this.ReceivedThongDiep=new EventEmitter<any>();
    this.cmt=new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection  
    this.connection = $.hubConnection(environment.Api);
    // this.connection.qs = { "id_user":this.auth.getLoggedInUser().id_user};
    // create new proxy as name already given in top  
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events  
    this.registerOnServerEvents();
    this.CheckOnlineOnServerEvents();
    this.SendMessenger();
    this.SendThongDiep();
    // call the connecion start method to start the connection to send and receive events.  
   // this.startConnection();
    // this.Comment_chill();
  }


  // ko lien quan code client http sao call dc https ? em có dùng iis publis sang http xong đổi port lại trong này

  // check in the browser console for either signalr connected or not  
  private startConnection(): void {

    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }

  private registerOnServerEvents(): void {
   // debugger
    this.proxy.on('addAnnouncement', (announcement: any) => {
      this.announcementReceived.emit(announcement);
    });
  }

  private CheckOnlineOnServerEvents(): void {
   
    this.proxy.on('checkuser_connect', (announcement: any) => {
      this.CheckOnline.emit(announcement);
    });
  }

  private SendMessenger(): void {

    this.proxy.on('sendMessenger', (announcement: any) => {
      this.ReceivedMessenger.emit(announcement);
    });
  }


  private SendThongDiep(): void {

    this.proxy.on('changesThongDiep', (announcement: any) => {
      this.ReceivedThongDiep.emit(announcement);
    });
  }

  // private Comment_chill(): void {

  //   this.proxy.on('cmt_child', (announcement: any) => {
  //     this.cmt.emit(announcement);
  //   });
  // }
}
