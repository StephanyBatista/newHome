import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import {Routes} from '../../server/web/Routes';
import {ErrorsHandler} from '../../server/web/middlewares/errors.handler';


describe('Routes', () => {

    var router = <Router>{
        post: (path, func) => {}
    };
    
    it('shoud create routes', () =>{

         var routes = new Routes(router);

         assert.isDefined(routes.router);
    });

    it('shoud create endpoint POST /api/v1/user', () =>{

        var postSpy = sinon.spy(router, 'post');
        
        var routes = new Routes(router);

        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });

    it('shoud apply the routes in application', () =>{

        var app = <Application>{
            use: (path: string, router: Router) => {}
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes(router);

        routes.Apply(app);

        sinon.assert.calledWith(useSpy, '/');
    });

    it('shoud set the middleware of erros generic', () =>{

        var errorsHandler = new ErrorsHandler();
        var funcExpected = errorsHandler.generic;
        
        var app = <Application>{
            use: (func) => {}
        };

        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes(router);

        routes.Apply(app);

        sinon.assert.calledWithExactly(useSpy, funcExpected);
    });
});