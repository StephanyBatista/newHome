import {assert} from 'chai';
import * as sinon from 'sinon'
import {Repository} from '../../server/infra/repository';
import {Session, Query, QueryBuilder} from "hydrate-mongodb";

describe('Repository', () => {

    class User{
        readonly id: number;
        readonly email: string;

        constructor(id: number, email: string){
            this.id = id;
            this.email = email;
        }
    }
    
    var userFound = new User(1, "user@gmail.com");
    
    it('Should create a repository', ()=> {

        var session = {};

        var repostory = new Repository(<Session>session);

        assert.isDefined(repostory.session);
    });

    it('Should find a entity', async ()=> {

        var asPromise = () => {
            return Promise.resolve(userFound);
        }
        var findOne = (query) => {
            return {
                asPromise: asPromise
            }
        }
        var query = (T) => {
            return {
                findOne: findOne
            }
        }
        var session = {
            query: query
        }
        
        var repository = new Repository(<Session>session);
        var email = userFound.email;

        var user = await repository.get(User, {email: email});
        
        assert.equal(email, user.email);
    });

    it('Should save a entity', async (done)=> {

        var save = (user: User) => {
            done();
        }
        var session = {
            save: save
        };
        
        var repostory = new Repository(<Session>session);
        var user = new User(2, "user2@gmail.com");

        await repostory.save(User, user);
    });

    it('Should list all entities', async ()=> {

        var asPromise = () => {
            return Promise.resolve([userFound]);
        }
        var findAll = (query) => {
            return {
                asPromise: asPromise
            }
        }
        var query = (T) => {
            return {
                findAll: findAll
            }
        }
        var session = {
            query: query
        }
        
        var repostory = new Repository(<Session>session);

        var entities = await repostory.all(User);
        assert.isDefined(entities);
        assert.isArray(entities);
    });
});

