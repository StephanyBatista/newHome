import {Mongoose, Connection} from 'mongoose';

export class Db{
    
    readonly mongoose: Mongoose;

    constructor(mongoose: Mongoose){
        
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
        this.mongoose.connection.db.Promise = require('bluebird');
    }

    public clone(){
        
        if(this.mongoose.connection)
            this.mongoose.connection.close();
    }
}