import {Mongoose, Model, Schema, Promise} from 'mongoose';
import {IUser} from './iuser';

export class UserModel{

    readonly model: Model<IUser>;

    constructor(){
        
        var uri = 'mongodb://localhost/newHome';
        var mongoose = new Mongoose(); 
        var db = mongoose.connect(uri);
        this.model = db.model<IUser>('User', this.generateSchema());
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
