"use strict";
const chai_1 = require("chai");
const sinon = require("sinon");
const router_manager_1 = require("../../server/web/router.manager");
describe('Routes', () => {
    var router = {
        post: (path, func) => { },
        put: (path, func) => { }
    };
    var userController = {
        post: (req, resp, next) => { }
    };
    it('shoud create the router manager', () => {
        var routes = new router_manager_1.RouterManager(router, userController);
        chai_1.assert.isDefined(routes.router);
    });
    it('shoud create endpoint POST /api/v1/user', () => {
        var postSpy = sinon.spy(router, 'post');
        var routes = new router_manager_1.RouterManager(router, userController);
        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });
    it('shoud create endpoint PUT /api/v1/user', () => {
        var putSpy = sinon.spy(router, 'put');
        var routes = new router_manager_1.RouterManager(router, userController);
        sinon.assert.calledWith(putSpy, '/api/v1/user');
    });
});
//# sourceMappingURL=router.manager.test.js.map