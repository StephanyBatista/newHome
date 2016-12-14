"use strict";
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
const user_1 = require("../../server/model/user");
describe('User dao', () => {
    beforeEach(() => {
        var mockgoose = require('mockgoose');
        mockgoose(mongoose_1.Mongoose);
    });
    var user = new user_1.User("user", "user@gmail.com", new Date());
    user.updatePassword("123");
    var UserDao = require('../../server/dao/user.dao');
    it('should create a new document when save a user', () => {
        var modelStub = class ModelMock {
            constructor(schema) {
                this.schema = schema;
            }
            save() {
                chai_1.assert.equal(user.name, this.schema.name);
                chai_1.assert.equal(user.birthday, this.schema.birthday);
                chai_1.assert.equal(user.password, this.schema.password);
                chai_1.assert.equal(user.email, this.schema.email);
            }
        };
        var dao = new UserDao(modelStub);
        dao.save(user);
    });
});
