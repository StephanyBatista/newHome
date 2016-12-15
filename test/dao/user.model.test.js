"use strict";
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../server/dao/user.model");
describe('User model', () => {
    beforeEach(() => {
        var mockgoose = require('mockgoose');
        var mongoose = new mongoose_1.Mongoose();
        mockgoose(mongoose);
    });
    it('must defined the model', () => {
        var userModel = new user_model_1.UserModel();
        chai_1.assert.isDefined(userModel.model);
    });
});
