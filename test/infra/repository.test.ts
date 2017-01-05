import {assert} from 'chai';
import * as sinon from 'sinon'
import {Repository} from '../../server/infra/repository';
import {Session, Query, QueryBuilder} from "hydrate-mongodb";

describe('Repository', () => {

    var session = {
        query: (T) => {
            return {
                findOne: (query) => {
                    return {
                        asPromise: () => {
                            return new Promise<User>((resolve, reject) => {return new User()});
                        }
                    }
                }
            }
        }
    };

    var repostory = new Repository(<Session>session);
    
    it('Should create a repository', ()=> {

        assert.isDefined(repostory.session);
    });

    it('Should find a entity', async ()=> {

        var repostory = new Repository(<Session>session);

        var email = "email@email";
        var user = await repostory.get(User, {email: email});
        assert.equal(email, user.email);
    });
});

class User{

    id: number;
    email: string;
}