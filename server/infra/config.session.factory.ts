import {MongoClient} from "mongodb";
import {Configuration, AnnotationMappingProvider} from "hydrate-mongodb";
import * as model from "../model/user";
import Injector from '../cross/injector';

export class ConfigSessionFactory{

    public static create(){

        var config = new Configuration();
        config.addMapping(new AnnotationMappingProvider(model));

        MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
            if(err) throw err;
            
            config.createSessionFactory(db, (err, sessionFactory) => {        
                 
                 Injector.register("sessionFactory", sessionFactory);
            });
        });
    }
}

