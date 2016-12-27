import * as express from 'express';
import * as sinon from 'sinon';
import {assert} from 'chai';
import {Startup} from '../../server/web/startup';
import {RouterManager} from '../../server/web/router.manager';
import {ErrorsHandler} from '../../server/web/middlewares/errors.handler'

describe('Web Startup', () => {
    
    var routerManager = <RouterManager>{
        router: {
            post: (path, func) => {},
            put: (path, func) => {},
            get: (path, func) => {}
        }
    };

    var errorsHandler = <ErrorsHandler>{
        generic: (err, req, res, next) => {}
    };
   
    it('should create the app', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {}
        };
        
        var startup = new Startup(app, routerManager, errorsHandler);

        assert.isDefined(startup.app);
    });

    it('shoud set the routers througt of the routers manager', () =>{

        var app = <express.Application>{
            use: (func) => {},
            engine: (param1: any, param2: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''}
        };
        var useSpy = sinon.spy(app, 'use');
        
        var startup = new Startup(app, routerManager, errorsHandler);

        sinon.assert.calledWith(useSpy, '/', routerManager.router);
    });

    it('shoud set the middleware of erros generic', () =>{

        var errorsHandler = new ErrorsHandler();
        var funcExpected = errorsHandler.generic;
        var app = <express.Application>{
            use: (func) => {},
            engine: (param1: any, param2: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''}
        };
        var useSpy = sinon.spy(app, 'use');
        
        var startup = new Startup(app, routerManager, errorsHandler);

        sinon.assert.calledWithExactly(useSpy, funcExpected);
    });

    it('should start the listen', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => {assert.equal('3000', port);},
            on: (type, func) => {}
        };
        
        var startup = new Startup(app, routerManager, errorsHandler);

        startup.listen();
    });

    it('should return a server', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => { return {}},
            on: (type, func) => {}
        };
        var startup = new Startup(app, routerManager, errorsHandler);

        var server = startup.listen();

        assert.isNotNull(server);
    });

    it('should haver a option to select the port of the app', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => {assert.equal('4000', port);},
            on: (type, func) => {}
        };
        var startup = new Startup(app, routerManager, errorsHandler);
        
        startup.listen('4000');
    });
});