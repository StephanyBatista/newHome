import {Mongoose, Model, Schema, Promise} from 'mongoose';
import {IUser} from './iuser';
import {Db} from './db';

export class UserSchemaGenerator{

    public static generate(){
        return new Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }
}
