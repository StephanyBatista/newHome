import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import {RouterManager} from '../../server/web/router.manager';
import {UserController} from '../../server/web/controllers/user.controller';

describe('Routes', () => {

    var router = <Router>{
        post: (path, func) => {},
        put: (path, func) => {}
    };

    var userController = <UserController>{
        post: (req, resp, next) => {}
    };
    
    it('shoud create the router manager', () =>{

         var routes = new RouterManager(router, userController);

         assert.isDefined(routes.router);
    });

    it('shoud create endpoint POST /api/v1/user', () =>{

        var postSpy = sinon.spy(router, 'post');
        
        var routes = new RouterManager(router, userController);

        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });

    it('shoud create endpoint PUT /api/v1/user', () =>{

        var putSpy = sinon.spy(router, 'put');
        
        var routes = new RouterManager(router, userController);

        sinon.assert.calledWith(putSpy, '/api/v1/user');
    });
});