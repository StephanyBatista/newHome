import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import {User} from '../../../server/model/user';
import {init} from "../../../server";
import {Startup} from "../../../server/web/startup";
import {Session} from "hydrate-mongodb";

describe('Authenticate', () => {

    var request = require('request');
    var server: Startup;
    var baseUrl = 'http://localhost:3000';
    var username = "user@gmail.com";
    var password = "123456";
    var session: Session;
    var user: User;

    before((done) => {

        init("3000", (err, result) => {
            if (err) return done(err);

            server = result;

            session = server.sessionFactory.createSession();

            user = new User("user", username, new Date("1985/11/25"));
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
            if (err) return done(err);

            // shutdown the http server
            server.close(done);
        });
    });

    it('should not authenticate when email and password are invalid', (done) => {

        request.post(
            {
                url: baseUrl + '/login',
                form:{
                    username: "aaa@gmail.com",
                    password: "teste123456"
                }
            },
            (error, resp, body) => {

                console.log(resp.headers['location']);
                
                assert.equal(resp.headers['location'], '/login');
                done();
            });
    });

    it('should authenticate when email and password are valid', (done) => {

        request.post(
            {
                url: baseUrl + '/login',
                form:{
                    username: username,
                    password: password
                }
            }, 
            (error, resp, body) => {
            
                assert.equal(resp.headers['location'], '/admin/');
                done();
        });
    });
});