import {assert} from 'chai';
import {Application, Router} from 'express';
import {Routes} from '../../server/web/Routes';
import * as sinon from 'sinon';

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
            use: (path: string, router: Router) => {
                assert.equal('/', path);
                assert.equal(router, routes.router);
            }
        };
        var useSpy = sinon.spy(app, 'use');
        var routes = new Routes(router);

        routes.Apply(app);
    });
});