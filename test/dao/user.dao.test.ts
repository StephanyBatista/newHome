import {assert} from 'chai';
import {Mongoose, Model} from 'mongoose';
import {User} from '../../server/model/user';
import {IUser} from '../../server/dao/iuser';
import {UserModel} from '../../server/dao/user.model';
import {UserDao} from '../../server/dao/user.dao'

describe('User dao', () => {

    beforeEach(() => {
        var mockgoose = require('mockgoose');
        mockgoose(Mongoose);
    });
    
    var user = new User(null, "user", "user@gmail.com", new Date());
    user.updatePassword("123");
    
    it('should create a new document when save a user', () => {
        
        var modelStub = class ModelMock{
            
            readonly schema;
            
            constructor(schema)
            {
                this.schema = schema;
            }

            public save(){

                assert.equal(user.name, this.schema.name);
                assert.equal(user.birthday, this.schema.birthday);
                assert.equal(user.password, this.schema.password);
                assert.equal(user.email, this.schema.email);
            }
        };

        var dao = new UserDao(<Model<IUser>>modelStub);

        dao.save(user);
    });
});
