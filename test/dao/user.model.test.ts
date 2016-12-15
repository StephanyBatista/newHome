import {assert} from 'chai';
import {Mongoose} from 'mongoose';
import {UserModel} from '../../server/dao/user.model';

describe('User model', () => {

    beforeEach(() => {
        var mockgoose = require('mockgoose');
        var mongoose = new Mongoose();
        mockgoose(mongoose);
    });

    it('must defined the model', () => {
        
        var userModel = new UserModel();
        assert.isDefined(userModel.model);
    });
});