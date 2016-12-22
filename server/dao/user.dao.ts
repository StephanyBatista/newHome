import {Mongoose, Schema, Model} from 'mongoose';
import {User} from '../../server/model/user';
import {UserSchemaGenerator} from '../../server/dao/user.model';
import {IUser} from './iuser';
import {Db} from './db';

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
        return this.model.findOneAndUpdate(
            {            
                email: user.email
            },
            {
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                password: user.password
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
            this.model.findOne({email: email}, (error: string, userResp: IUser) => {
                if(error) reject(error);
                else if(userResp)
                    resolve(new User(userResp.id.toString(), userResp.name, userResp.email, userResp.birthday));
                else
                    resolve(null);
            });
        });
    }
}

exports['@singleton'] = true;