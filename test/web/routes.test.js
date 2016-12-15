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
            use: (param1, param2) => { }
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes_1.Routes(router);
        routes.Apply(app);
        console.log(useSpy.getCall(1).args);
        sinon.assert.calledWith(useSpy, ['/', routes.router]);
    });
});
