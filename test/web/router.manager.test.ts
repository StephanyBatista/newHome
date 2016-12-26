import {assert} from 'chai';
import {Application, Router} from 'express';
import * as sinon from 'sinon';
import {RouterManager} from '../../server/web/router.manager';
import {UserController} from '../../server/web/controllers/user.controller';
import {AdminController} from '../../server/web/controllers/admin.controller';

describe('Routes', () => {

    var router = <Router>{
        post: (path, func) => {},
        put: (path, func) => {}
    };

    var userController = <UserController>{
        post: (req, resp, next) => {},
        put: (req, resp, next) => {}
    };

    var adminController = <AdminController>{
        get: (req, resp, next) => {}
    };
    
    it('shoud create the router manager', () =>{

         var routes = new RouterManager(router, userController, adminController);

         assert.isDefined(routes.router);
    });

    it('shoud create endpoint POST /api/v1/user', () =>{

        var postSpy = sinon.spy(router, 'post');
        
        var routes = new RouterManager(router, userController, adminController);

        sinon.assert.calledWith(postSpy, '/api/v1/user');
    });

    it('shoud create endpoint PUT /api/v1/user', () =>{

        var putSpy = sinon.spy(router, 'put');
        
        var routes = new RouterManager(router, userController, adminController);

        sinon.assert.calledWith(putSpy, '/api/v1/user');
    });
});