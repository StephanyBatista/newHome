"use strict";
const chai_1 = require("chai");
const Routes_1 = require("../../server/web/Routes");
const sinon = require("sinon");
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
            use: (path, router) => {
                chai_1.assert.equal('/', path);
                chai_1.assert.equal(router, routes.router);
            }
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes_1.Routes(router);
        routes.Apply(app);
    });
});
//# sourceMappingURL=routes.test.js.map