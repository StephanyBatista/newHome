import {Mongoose, Schema, Model} from 'mongoose';
import {User} from '../../server/model/user';
import {IUser} from './iuser';

class UserDao{

    readonly model: Model<IUser>;

    constructor(model: Model<IUser>){

        var mongoose = new Mongoose();
        mongoose.connect('mongodb://localhost/newHome');
        this.model = model;
    }

    private generateSchema(){
        return new Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }

    public save(user: User){
        new this.model({
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            password: user.password
        }).save();
    }
}

export = UserDao;