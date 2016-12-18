import {Mongoose} from 'mongoose';
import {Db} from '../../server/dao/db';
import {assert} from 'chai';


describe('DB', () => {

    var mongoose = new Mongoose();
    
    beforeEach(() => {
        var mockgoose = require('mockgoose');
        mockgoose(mongoose);
    });

    it('Must define mongoose', () => {

        var db = new Db(mongoose);

        assert.isDefined(db.mongoose);
    });
});