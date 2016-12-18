import {Mongoose, Schema, Model} from 'mongoose';
import {User} from '../../server/model/user';
import {UserModel} from '../../server/dao/user.model';
import {IUser} from './iuser';

export class UserDao{

    readonly model: Model<IUser>;

    constructor(model?: Model<IUser>){

        var mongoose = new Mongoose();
        mongoose.connect('mongodb://localhost/newHome');
        this.model = model;

        if(this.model == null)
            this.model = new UserModel().model;
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
}