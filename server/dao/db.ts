import {Mongoose} from 'mongoose';

export class Db{
    
    readonly mongoose: Mongoose;

    constructor(){
        
        var mongoose = require('mongoose')
        mongoose.Promise = require('bluebird');
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
    }
}