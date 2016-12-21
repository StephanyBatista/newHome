import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';

describe('API User', () => {

    var server;
    var request = require('request');
    var baseUrl = 'http://localhost:4567';

    before(() => {
        server = require('../../../bootstrap')(4567);
    });

    after(() => {
        server.close();
    });

    it('should not return sucess when save a user invalid', () => {

        request.post(
            {
                url: baseUrl + '/api/v1/user'
            }, 
            (error, resp, body) => {
            
                assert.equal(false, body.success);
        });
    });
    
    it('should return sucess when save the user', () => {

        request.post(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'alfred',
                    email: 'alfred@gmail.com',
                    birthday: '1985/11/25',
                    password: '123456'
                }
            }, 
            (error, resp, body) => {
            
                assert.equal(true, body.success);
        });
    });

    it('should update the user when already exists user with same id', () => {

        request.post(
            {
                url: baseUrl + '/api/v1/user',
                form:{
                    name: 'alfred',
                    email: 'alfred@gmail.com',
                    birthday: '1985/11/25',
                    password: '123456'
                }
            }, 
            (error, resp, body) => {
            
                assert.equal(true, body.success);
        });
    });
});