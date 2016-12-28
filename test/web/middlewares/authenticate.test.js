"use strict";
const chai_1 = require("chai");
const injector_1 = require("../../../server/cross/injector");
const user_1 = require("../../../server/model/user");
describe('Authenticate', () => {
    var server;
    var request = require('request');
    var baseUrl = 'http://localhost:3000';
    var user = new user_1.User(null, "user", "user@gmail.com", new Date("1985/11/25"));
    user.updatePassword("123456");
    before(() => {
        server = require('../../../bootstrap');
        var userDao = injector_1.default.getRegistered("userDao");
        userDao.save(user);
    });
    after(() => {
        var userDao = injector_1.default.getRegistered("userDao");
        userDao.delete(user.email);
    });
    it('should authenticate when email and password are valid', (done) => {
        request.post({
            url: baseUrl + '/login',
            form: {
                username: user.email,
                password: user.password
            }
        }, (error, resp, body) => {
            chai_1.assert.equal('/admin/', resp.headers['location']);
            done();
        });
    });
    it('should not authenticate when email and password are invalid', (done) => {
        request.post({
            url: baseUrl + '/login',
            form: {
                username: "aaa@gmail.com",
                password: "teste123456"
            }
        }, (error, resp, body) => {
            chai_1.assert.equal('/login', resp.headers['location']);
            done();
        });
    });
});
//# sourceMappingURL=authenticate.test.js.map