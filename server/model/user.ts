import {DomainException} from './domain.exception';
import {Entity, Field} from "hydrate-mongodb";

@Entity()
export class User{
    
    @Field()
    id: string;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    birthday: Date;
    @Field()
    private _password: string;

    get password() {
        return this._password;
    }
    
    constructor(id: string, name: string, email: string, birthday: Date){
        
        DomainException.when(name == null || name == '', "Name is required");
        DomainException.when(email == null || email == '', "E-mail is required");
        DomainException.when(birthday == null, "Birthday is required");
        
        if(id)
            this.id = id;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }

    updatePassword(password: string){
        this._password = password;
    }

    hasId(){
        return this.id != null && this.id != '';
    }
}
