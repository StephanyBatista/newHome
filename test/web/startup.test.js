"use strict";
const sinon = require("sinon");
const chai_1 = require("chai");
const startup_1 = require("../../server/web/startup");
const errors_handler_1 = require("../../server/web/middlewares/errors.handler");
describe('Web Startup', () => {
    var routerManager = {
        router: {
            post: (path, func) => { },
            put: (path, func) => { },
            get: (path, func) => { }
        }
    };
    var errorsHandler = {
        generic: (err, req, res, next) => { }
    };
    it('should create the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { }
        };
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        chai_1.assert.isDefined(startup.app);
    });
    it('shoud set the routers througt of the routers manager', () => {
        var app = {
            use: (func) => { },
            engine: (param1, param2) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; }
        };
        var useSpy = sinon.spy(app, 'use');
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        sinon.assert.calledWith(useSpy, '/', routerManager.router);
    });
    it('shoud set the middleware of erros generic', () => {
        var errorsHandler = new errors_handler_1.ErrorsHandler();
        var funcExpected = errorsHandler.generic;
        var app = {
            use: (func) => { },
            engine: (param1, param2) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; }
        };
        var useSpy = sinon.spy(app, 'use');
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        sinon.assert.calledWithExactly(useSpy, funcExpected);
    });
    it('should start the listen', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('3000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        startup.listen();
    });
    it('should return a server', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { return {}; },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        var server = startup.listen();
        chai_1.assert.isNotNull(server);
    });
    it('should haver a option to select the port of the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('4000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app, routerManager, errorsHandler);
        startup.listen('4000');
    });
});
//# sourceMappingURL=startup.test.js.map