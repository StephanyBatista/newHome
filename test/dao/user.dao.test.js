"use strict";
const chai_1 = require("chai");
const sinon = require("sinon");
const mongoose_1 = require("mongoose");
const user_1 = require("../../server/model/user");
const user_dao_1 = require("../../server/dao/user.dao");
const db_1 = require("../../server/dao/db");
describe('User dao', () => {
    var db;
    var user = new user_1.User(null, "user", "user@gmail.com", new Date());
    user.updatePassword("123");
    beforeEach((done) => {
        var mongoose = new mongoose_1.Mongoose();
        db = new db_1.Db(mongoose);
        var dao = new user_dao_1.UserDao(db, schema);
        done();
    });
    var schema = new mongoose_1.Schema({
        name: String,
        email: String,
        birthday: Date,
        password: String
    });
    it('should create the user model', () => {
        var mongoose = db.mongoose;
        var modelSpy = sinon.spy(mongoose, 'model');
        var dao = new user_dao_1.UserDao(db, schema);
        chai_1.assert.isDefined(dao.model);
        sinon.assert.calledWith(modelSpy, 'User', schema);
    });
    it('should create a new document when save a user', (done) => {
        var dao = new user_dao_1.UserDao(db, schema);
        dao.save(user).then(() => {
            chai_1.assert.isTrue(true);
            done();
        }, () => {
            chai_1.assert.isTrue(false);
            done();
        });
    });
    it('should get a user by email', (done) => {
        var dao = new user_dao_1.UserDao(db, schema);
        dao.save(user).then(() => {
            dao.getByEmail("user@gmail.com").then((userSaved) => {
                console.log(userSaved);
                chai_1.assert.equal(user.name, userSaved.name);
                chai_1.assert.equal(user.email, userSaved.email);
                chai_1.assert.equal(user.birthday, userSaved.birthday);
                done();
            });
        });
    });
});
//# sourceMappingURL=user.dao.test.js.map