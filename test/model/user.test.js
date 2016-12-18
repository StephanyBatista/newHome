"use strict";
const chai_1 = require("chai");
const user_1 = require("../../server/model/user");
var name = "user";
var email = "user@gmail.com";
var birthday = new Date('25/11/1985');
describe('domain user', () => {
    it('should be able create a user', () => {
        var user = new user_1.User(null, name, email, birthday);
        chai_1.assert.equal(user.name, name);
        chai_1.assert.equal(user.email, email);
        chai_1.assert.equal(user.birthday, birthday);
    });
    it('should be able create a user with id', () => {
        var id = "5";
        var user = new user_1.User(id, name, email, birthday);
        chai_1.assert.equal(user.name, name);
        chai_1.assert.equal(user.email, email);
        chai_1.assert.equal(user.birthday, birthday);
        chai_1.assert.equal(user.id, id);
    });
    it('should say that user has id', () => {
        var id = "5";
        var user = new user_1.User(id, name, email, birthday);
        chai_1.assert.isTrue(user.hasId());
    });
    it('should say that user does not have id', () => {
        var id = null;
        var user = new user_1.User(id, name, email, birthday);
        chai_1.assert.isFalse(user.hasId());
    });
    it('should not create without name', () => {
        chai_1.assert.throws(() => { new user_1.User(null, null, email, birthday); }, "Name is required");
    });
    it('should not create without email', () => {
        chai_1.assert.throws(() => { new user_1.User(null, name, null, birthday); }, "E-mail is required");
    });
    it('should not create without birthday', () => {
        chai_1.assert.throws(() => { new user_1.User(null, name, email, null); }, "Birthday is required");
    });
    it('should set the password', () => {
        var user = new user_1.User(null, name, email, birthday);
        var password = "xpt45";
        user.updatePassword(password);
        chai_1.assert.equal(user.password, password);
    });
});
//# sourceMappingURL=user.test.js.map