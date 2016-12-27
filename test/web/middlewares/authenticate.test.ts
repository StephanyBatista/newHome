import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import Injector from '../../../server/cross/injector';
import {UserDao} from '../../../server/dao/user.dao';
import {User} from '../../../server/model/user';

describe('Authenticate', () => {

    var server;
    var request = require('request');
    var baseUrl = 'http://localhost:3000';
    var user = new User(null, "user", "user@gmail.com", new Date("1985/11/25"));
    user.updatePassword("123456");

    before(() => {
        
        server = require('../../../bootstrap');
        var userDao = <UserDao>Injector.getRegistered("userDao");
        userDao.save(user);
    });

    after(() => {
        
        var userDao = <UserDao>Injector.getRegistered("userDao");
        userDao.delete(user.email);
    });

    it('should authenticate when email and password are valid', (done) => {

        request.post(
            {
                url: baseUrl + '/login',
                form:{
                    username: user.email,
                    password: user.password
                }
            }, 
            (error, resp, body) => {
            
                assert.equal('/admin/', resp.headers['location']);
                done();
        });
    });

    it('should authenticate when email and password are invalid', (done) => {

        request.post(
            {
                url: baseUrl + '/login',
                form:{
                    username: "aaa@gmail.com",
                    password: "teste123456"
                }
            }, 
            (error, resp, body) => {
            
                assert.equal('/login', resp.headers['location']);
                done();
        });
    });
});