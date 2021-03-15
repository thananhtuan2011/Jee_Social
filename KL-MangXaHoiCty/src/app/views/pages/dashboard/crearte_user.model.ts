import { BaseModel } from './../../../core/_base/crud/models/_base.model';

export class TKUser extends BaseModel {
    id_user: number;
    IDNV:number;
    username: string;
    pass: string;
    email: string;
  
    TinhTrang: boolean;

    clear(): void {
        this.id_user = 0;
        this.username ='';
        this.pass = '';
        this.email = '';
        this.IDNV = 0;
      
        this.TinhTrang =false;
        
      
    }
}
