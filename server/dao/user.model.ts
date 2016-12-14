import {Mongoose, Model, Schema} from 'mongoose';
import {IUser} from './iuser';

export class UserModel{

    readonly model: Model<IUser>;

    constructor(){
        
        var mongoose = new Mongoose();
        this.model = mongoose.model<IUser>('User', this.generateSchema());
    }

    private generateSchema(){
        return new Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }
}
