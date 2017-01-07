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
        console.log(birthday.toString());
        DomainException.when(birthday.toString() == "Invalid Date", "Birthday is not valid");
        
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }

    updatePassword(password: string): void {

        DomainException.when(password == null || password == '', "Password is required");
        DomainException.when(password.length < 3, "Password must have in the minimum 3 characters");
        
        this._password = password;
    }

    verifyPassword(password: string): boolean {

        // todo: store password hashed. checkout them module 'bcrypt-nodejs'
        return this.password === password;
    }
}
