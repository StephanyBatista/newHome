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