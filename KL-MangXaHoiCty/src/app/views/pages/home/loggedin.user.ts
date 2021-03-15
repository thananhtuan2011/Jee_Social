export class LoggedInUser {
    constructor(ID_user: number, Username: string, fullName: string, Email: string, Avatar: string
    ) {
        this.id_user = ID_user;
        this.fullName = fullName;
        this.username = Username;
        this.email = Email;
        this.avatar = Avatar;
        
    }
    public id_user: number;
    public access_token: string;
    public username: string;
    public fullName: string;
    public email: string;
    public avatar: string;
    
}