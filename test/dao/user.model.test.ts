import {assert} from 'chai';
import {Mongoose} from 'mongoose';


describe('User model', () => {

    beforeEach(() => {
        var mockgoose = require('mockgoose');
        var mongoose = new Mongoose();
        mockgoose(mongoose);
    });

    var UserModel = require('../../server/dao/user.model');
    
    it('must defined the model', () => {
        
        var userModel = new UserModel();
        assert.isDefined(userModel.model);
    });
});