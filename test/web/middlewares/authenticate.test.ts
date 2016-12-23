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

    it('should authenticate when email and password is valid', (done) => {

        request.post(
            {
                url: baseUrl + '/signup',
                form:{
                    email: user.email,
                    password: user.password
                }
            }, 
            (error, resp, body) => {
            
                var bodyJson = JSON.parse(body);
                assert.isTrue(bodyJson.success);
                done();
        });
    });
});