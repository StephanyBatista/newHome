"use strict";
const chai_1 = require("chai");
const server_1 = require("../../../server");
const user_1 = require("../../../server/model/user");
describe('API User', () => {
    // create a request object with cookied enabled
    var request = require('request').defaults({ jar: true });
    var server;
    var baseUrl = 'http://localhost:3000';
    var emailDefault = `${Date.now()}alfred@gmail.com`;
    var adminUsername = "admin@gmail.com";
    var adminPassword = "123456";
    var session;
    var user;
    before((done) => {
        server_1.init("3000", (err, result) => {
            if (err)
                return done(err);
            server = result;
            session = server.sessionFactory.createSession();
            // create an admin user so we can logon
            user = new user_1.User("user", adminUsername, new Date("1985/11/25"));
            user.updatePassword(adminPassword);
            session.save(user);
            // flush the session to write changes to the database but keep the session open to remove the user in the 'after' hook
            session.flush((err) => {
                if (err)
                    return done(err);
                // since cookies are enabled the authentication will work for all tests that follow
                authenticate(done);
            });
        });
    });
    after((done) => {
        // delete the admin user created in the 'before' hook that was used to logon
        session.remove(user);
        // delete the user that was created by the service if one exists
        session.query(user_1.User).findOne({ email: emailDefault }, (err, createdUser) => {
            if (err)
                return done(err);
            if (!createdUser) {
                return done();
            }
            // delete the user created by the service
            session.remove(createdUser);
            // flush changes to the database and close the session
            session.close((err) => {
                if (err)
                    return done(err);
                // shutdown the http server
                server.close(done);
            });
        });
    });
    function authenticate(next) {
        request.post({
            url: baseUrl + '/login',
            form: {
                username: adminUsername,
                password: adminPassword
            }
        }, (err, resp, body) => {
            if (err)
                return next(err);
            chai_1.assert.equal(302, resp.statusCode);
            chai_1.assert.equal(resp.headers['location'], '/admin/');
            next();
        });
    }
    it('should not return success when email was not informed', (done) => {
        request.post({
            url: baseUrl + '/api/v1/user'
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isFalse(bodyJson.success);
            chai_1.assert.equal("Email was not informed", bodyJson.error);
            done();
        });
    });
    it('should not return success when save a user invalid', (done) => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                email: emailDefault
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isFalse(bodyJson.success);
            done();
        });
    });
    it('should return success when save the user', (done) => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'alfred',
                email: emailDefault,
                birthday: '1985/11/25',
                password: '123456'
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isTrue(bodyJson.success, bodyJson.error);
            done();
        });
    });
    it('should not return success when password does not have in the minumum 3 characters', (done) => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'alfred',
                email: emailDefault,
                birthday: '1985/11/25',
                password: '12'
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isFalse(bodyJson.success, bodyJson.error);
            done();
        });
    });
    it('should not save a user with same email', (done) => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'alfred',
                email: emailDefault,
                birthday: '1985/11/25',
                password: '123456'
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isFalse(bodyJson.success);
            done();
        });
    });
    it('should update user when email exists', (done) => {
        request.put({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'batman',
                email: emailDefault,
                birthday: '1990/01/01'
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isTrue(bodyJson.success);
            done();
        });
    });
    it('should not update when email was not found', (done) => {
        request.put({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'batman',
                email: 'aaa@aaa.com.py',
                birthday: '1990/01/01'
            }
        }, (error, resp, body) => {
            var bodyJson = JSON.parse(body);
            chai_1.assert.isFalse(bodyJson.success);
            chai_1.assert.equal("User was not found", bodyJson.error);
            done();
        });
    });
});
