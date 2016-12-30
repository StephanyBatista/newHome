import {DomainException} from './domain.exception';
import {Entity, Field} from "hydrate-mongodb";

@Entity()
export class User {
    
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    birthday: Date;

    @Field()
    private _password: string;

    get password(): string {
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
