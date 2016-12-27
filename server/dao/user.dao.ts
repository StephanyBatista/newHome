import {Mongoose, Schema, Model} from 'mongoose';
import {User} from '../../server/model/user';
import {UserSchemaGenerator} from '../../server/dao/user.model';
import {IUser} from './iuser';
import {Db} from './db';

//https://github.com/artifacthealth/hydrate-mongodb
export class UserDao{

    readonly model: Model<IUser>;
    readonly db: Db;

    constructor(db: Db, schema: Schema){

        this.db = db;
        this.model = db.mongoose.model<IUser>('User', schema);
    }

    public save(user: User){
        
        var document = new this.model({
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            password: user.password
        });

        return document.save();
    }

    public update(user: User){
        
        return this.model.update(
            {            
                email: user.email
            },
            {
                $set: {
                    name: user.name,
                    birthday: user.birthday
                }
            }
        ).exec();
    }

    public delete(email: string){
        
        return this.model.remove(
            {            
                email: email
            }
        ).exec();
    }

    public getByEmail(email: string){
        
        return new Promise((resolve, reject) => {
            this.model.findOne({email: email}, (error: string, userSaved: IUser) => {
                if(error) reject(error);
                else if(userSaved)
                    resolve(new User(userSaved.id.toString(), userSaved.name, userSaved.email, userSaved.birthday));
                else
                    resolve(null);
            });
        });
    }

    public getByEmailAndPassword(email: string, password: string){
        
        return new Promise((resolve, reject) => {
            this.model.findOne({email: email, password: password}, (error: string, userSaved: IUser) => {
                if(error) reject(null);
                else if(userSaved)
                    resolve(new User(userSaved.id.toString(), userSaved.name, userSaved.email, userSaved.birthday));
                else
                    resolve(null);
            });
        });
    }
}
