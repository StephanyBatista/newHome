"use strict";
const chai_1 = require("chai");
const user_1 = require("../../../server/model/user");
const server_1 = require("../../../server");
describe('Authenticate', () => {
    var request = require('request');
    var server;
    var baseUrl = 'http://localhost:3000';
    var username = "user@gmail.com";
    var password = "123456";
    var session;
    var user;
    before((done) => {
        server_1.init("3000", (err, result) => {
            if (err)
                return done(err);
            server = result;
            session = server.sessionFactory.createSession();
            user = new user_1.User("user", username, new Date("1985/11/25"));
            user.updatePassword(password);
            session.save(user);
            // flush the session to write changes to the database but keep the session open to remove the user in the 'after' hook
            session.flush(done);
        });
    });
    after((done) => {
        // delete the user created in the 'before' hook
        session.remove(user);
        // flush changes to the database and close the session
        session.close((err) => {
            if (err)
                return done(err);
            // shutdown the http server
            server.close(done);
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
            console.log(resp.headers['location']);
            chai_1.assert.equal(resp.headers['location'], '/login');
            done();
        });
    });
    it('should authenticate when email and password are valid', (done) => {
        request.post({
            url: baseUrl + '/login',
            form: {
                username: username,
                password: password
            }
        }, (error, resp, body) => {
            chai_1.assert.equal(resp.headers['location'], '/admin/');
            done();
        });
    });
});
