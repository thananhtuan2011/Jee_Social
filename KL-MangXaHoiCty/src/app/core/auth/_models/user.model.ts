import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
    ID_User: number;
    ID_NV:number;
    username: string;
    password: string;
    email: string;
    accessToken: string;
    // refreshToken: string;
    roles: number[];
    pic: string;
    // fullname: string;
    TinhTrang: boolean;
	// companyName: string;
	
    // socialNetworks: SocialNetworks;

    clear(): void {
        this.ID_User = undefined;
        this.username ='';
        this.password = '';
        this.email = '';
        this.roles = [];
        // this.fullname = '';
        this.accessToken = 'access-token-' + Math.random();
        // this.refreshToken = 'access-token-' + Math.random();
        this.pic = './assets/media/users/default.jpg';
        this.TinhTrang =false;
        
        // this.socialNetworks = new SocialNetworks();
        // this.socialNetworks.clear();
    }
}
