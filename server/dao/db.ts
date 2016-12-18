import {Mongoose, Connection} from 'mongoose';

export class Db{
    
    readonly mongoose: Mongoose;

    constructor(mongoose: Mongoose){
        
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
    }
}