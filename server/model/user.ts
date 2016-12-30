import {DomainException} from './domain.exception';
import {Entity, Field, Index} from "hydrate-mongodb";

@Entity()
export class User {
    
    id: string;

    @Field()
    name: string;

    @Index({ options: { unique: true }})
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

    updatePassword(password: string): void {

        this._password = password;
    }

    verifyPassword(password: string): boolean {

        // todo: store password hashed. checkout them module 'bcrypt-nodejs'
        return this.password === password;
    }
}
