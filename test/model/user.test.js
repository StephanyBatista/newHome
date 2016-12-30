"use strict";
const chai_1 = require("chai");
const user_1 = require("../../server/model/user");
var name = "user";
var email = "user@gmail.com";
var birthday = new Date('25/11/1985');
describe('Domain User', () => {
    it('should be able create a user', () => {
        var user = new user_1.User(name, email, birthday);
        chai_1.assert.equal(user.name, name);
        chai_1.assert.equal(user.email, email);
        chai_1.assert.equal(user.birthday, birthday);
    });
    it('should not create without name', () => {
        chai_1.assert.throws(() => { new user_1.User(null, email, birthday); }, "Name is required");
    });
    it('should not create without email', () => {
        chai_1.assert.throws(() => { new user_1.User(name, null, birthday); }, "E-mail is required");
    });
    it('should not create without birthday', () => {
        chai_1.assert.throws(() => { new user_1.User(name, email, null); }, "Birthday is required");
    });
    it('should set the password', () => {
        var user = new user_1.User(name, email, birthday);
        var password = "xpt45";
        user.updatePassword(password);
        chai_1.assert.equal(user.password, password);
    });
});
//# sourceMappingURL=user.test.js.map