"use strict";
const chai_1 = require("chai");
const server_1 = require("../../../server/web/server");
describe('API User', () => {
    var server;
    var request = require('request');
    var baseUrl = 'http://localhost:4567';
    before(() => {
        server = new server_1.Server("4567");
    });
    after(() => {
        server.close();
    });
    it('should not return sucess when save a user invalid', () => {
        request.post({
            url: baseUrl + '/api/v1/user'
        }, (error, resp, body) => {
            chai_1.assert.equal(false, body.success);
        });
    });
    it('should return sucess when save the user', () => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'alfred',
                email: 'alfred@gmail.com',
                birthday: '1985/11/25',
                password: '123456'
            }
        }, (error, resp, body) => {
            chai_1.assert.equal(true, body.success);
        });
    });
    it('should update the user when already exists user with same id', () => {
        request.post({
            url: baseUrl + '/api/v1/user',
            form: {
                name: 'alfred',
                email: 'alfred@gmail.com',
                birthday: '1985/11/25',
                password: '123456'
            }
        }, (error, resp, body) => {
            chai_1.assert.equal(true, body.success);
        });
    });
});
//# sourceMappingURL=user.controller.test.js.map