import {MongoClient} from "mongodb";
import {Configuration, AnnotationMappingProvider, Session, SessionFactory} from "hydrate-mongodb";
import {User} from "../model/user";
import Injector from '../cross/injector';

export class ConfigSessionFactory{

    private static _current: SessionFactory;

    static setSessionFactory(sessionFactory: SessionFactory){

        this._current = sessionFactory;
    }

    static get current(): SessionFactory{

        return this.current;
    }

    static session(): Session{
        
        return this._current.createSession();
    }
    
    public static create(){

        var config = new Configuration();
        config.addMapping(new AnnotationMappingProvider(User));
        
        MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
            if(err) throw err;
            
            config.createSessionFactory(db, (err, sessionFactory: SessionFactory) => {

                var session = sessionFactory.createSession();
                session.query(User).findOne({email: "req.body.email"}, (err, user: User) => {
                    var a = user;
                    var b = 1;
                });

            });
        });
    }
}



