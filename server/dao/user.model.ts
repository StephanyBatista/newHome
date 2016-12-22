import {Mongoose, Model, Schema, Promise} from 'mongoose';
import {IUser} from './iuser';
import {Db} from './db';

export class UserSchemaGenerator{

    public static generate(){
        return new Schema({
            name: { type: String, required: true },
            email: { type: String, index: true, unique: true, required: true },
            birthday: { type: Date, required: true },
            password: { type: String, required: true }
        });
    }
}
