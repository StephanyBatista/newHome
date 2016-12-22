import {assert} from 'chai';
import * as sinon from 'sinon';
import {Mongoose, Model, Schema} from 'mongoose';
import {User} from '../../server/model/user';
import {IUser} from '../../server/dao/iuser';
import {UserSchemaGenerator} from '../../server/dao/user.model';
import {UserDao} from '../../server/dao/user.dao'
import {Db} from '../../server/dao/db';

describe('User dao', () => {

    var db: Db;
    var user = new User(null, "user", "user@gmail.com", new Date());
    user.updatePassword("123");

    beforeEach((done) => {

        var mongoose = new Mongoose();
        db = new Db(mongoose);
        var dao = new UserDao(db, schema);
        done();
    });

    var schema = new Schema({
        name: String,
        email: String,
        birthday: Date,
        password: String
    });

    it('should create the user model', () => {

        var mongoose = db.mongoose;
        var modelSpy = sinon.spy(mongoose, 'model');
        
        var dao = new UserDao(db, schema);

        assert.isDefined(dao.model);
        sinon.assert.calledWith(modelSpy, 'User', schema);
    });    
    
    it('should create a new document when save a user', (done) => {
        
        var dao = new UserDao(db, schema);

        dao.save(user).then(
            () => { 
                assert.isTrue(true);
                done();
            },
            () => { 
                assert.isTrue(false);
                done();
            }
        );
    });

    it('should get a user by email', (done) => {

        var dao = new UserDao(db, schema);
        dao.save(user).then(() => {

            dao.getByEmail("user@gmail.com").then((userSaved: User) => {

                console.log(userSaved);
                assert.equal(user.name, userSaved.name);
                assert.equal(user.email, userSaved.email);
                assert.equal(user.birthday, userSaved.birthday);
                done();
            });
        });
    });
});
