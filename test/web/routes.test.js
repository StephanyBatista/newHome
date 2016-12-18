"use strict";
const chai_1 = require("chai");
const sinon = require("sinon");
const Routes_1 = require("../../server/web/Routes");
const errors_handler_1 = require("../../server/web/middlewares/errors.handler");
describe('Routes', () => {
    var router = {
        post: (path, func) => { }
    };
    it('shoud create routes', () => {
        var routes = new Routes_1.Routes(router);
        chai_1.assert.isDefined(routes.router);
    });
    it('shoud create endpoint POST /api/v1/user', () => {
        var postSpy = sinon.spy(router, 'post');
        var routes = new Routes_1.Routes(router);
        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });
    it('shoud apply the routes in application', () => {
        var app = {
            use: (path, router) => { }
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes_1.Routes(router);
        routes.Apply(app);
        sinon.assert.calledWith(useSpy, '/');
    });
    it('shoud set the middleware of erros generic', () => {
        var errorsHandler = new errors_handler_1.ErrorsHandler();
        var funcExpected = errorsHandler.generic;
        var app = {
            use: (func) => { }
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes_1.Routes(router);
        routes.Apply(app);
        sinon.assert.calledWithExactly(useSpy, funcExpected);
    });
});
//# sourceMappingURL=routes.test.js.map