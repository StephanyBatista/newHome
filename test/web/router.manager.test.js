"use strict";
const chai_1 = require("chai");
const sinon = require("sinon");
const router_manager_1 = require("../../server/web/router.manager");
describe('Routes', () => {
    var router = {
        post: (path, func) => { },
        put: (path, func) => { },
        get: (path, func) => { },
        all: (path, func) => { }
    };
    var userController = {
        post: (req, resp, next) => { },
        put: (req, resp, next) => { }
    };
    var adminController = {
        get: (req, resp, next) => { }
    };
    it('should create the router manager', () => {
        var routes = new router_manager_1.RouterManager(router, adminController, userController);
        chai_1.assert.isDefined(routes.router);
    });
    it('should create endpoint GET /admin/', () => {
        var postSpy = sinon.spy(router, 'get');
        var routes = new router_manager_1.RouterManager(router, adminController, userController);
        sinon.assert.calledWith(postSpy, '/admin/');
    });
    it('should create endpoint POST /api/v1/user', () => {
        var postSpy = sinon.spy(router, 'post');
        var routes = new router_manager_1.RouterManager(router, adminController, userController);
        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });
    it('should create endpoint PUT /api/v1/user', () => {
        var putSpy = sinon.spy(router, 'put');
        var routes = new router_manager_1.RouterManager(router, adminController, userController);
        sinon.assert.calledWith(putSpy, '/api/v1/user');
    });
});
