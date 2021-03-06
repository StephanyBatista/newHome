"use strict";
const chai_1 = require("chai");
const user_1 = require("../../server/model/user");
var moment = require('moment');
var name = "user";
var email = "user@gmail.com";
var birthday = moment('25/11/1985', 'DD/MM/YYYY').toDate();
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
    it('should not create with a birthday invalid', () => {
        chai_1.assert.throws(() => { new user_1.User(name, email, new Date('25/11/1985')); }, "Birthday is not valid");
    });
    it('should set the password', () => {
        var user = new user_1.User(name, email, birthday);
        var password = "xpt45";
        user.updatePassword(password);
        chai_1.assert.equal(user.password, password);
    });
    it('should not set the password in empty or null', () => {
        var user = new user_1.User(name, email, birthday);
        chai_1.assert.throws(() => { user.updatePassword(''); }, "Password is required");
        chai_1.assert.throws(() => { user.updatePassword(null); }, "Password is required");
    });
    it('should validate the password to have minimum 3 characters', () => {
        var user = new user_1.User(name, email, birthday);
        chai_1.assert.throws(() => { user.updatePassword('12'); }, "Password must have in the minimum 3 characters");
    });
    it('should get the birthday in format dd/mm/yyyy', () => {
        var user = new user_1.User(name, email, birthday);
        chai_1.assert.equal('1/11/1985', user.birthdayFormatted());
    });
});
