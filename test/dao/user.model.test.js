"use strict";
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
describe('User model', () => {
    beforeEach(() => {
        var mockgoose = require('mockgoose');
        var mongoose = new mongoose_1.Mongoose();
        mockgoose(mongoose);
    });
    var UserModel = require('../../server/dao/user.model');
    it('must defined the model', () => {
        var userModel = new UserModel();
        chai_1.assert.isDefined(userModel.model);
    });
});
