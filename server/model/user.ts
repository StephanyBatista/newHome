import {DomainException} from './DomainException';

export class User{
    readonly name: string;
    readonly email: string;
    readonly birthday: Date;
    private _password: string;

    get password() {
        return this._password;
    }
    
    constructor(name: string, email: string, birthday: Date){
        
        DomainException.when(name == null || name == '', "Name is required");
        DomainException.when(email == null || email == '', "E-mail is required");
        DomainException.when(birthday == null, "Birthday is required");
        
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }

    updatePassword(password: string){
        this._password = password;
    }
}
