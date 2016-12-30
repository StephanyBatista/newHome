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
}



