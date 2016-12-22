import {Db} from './server/dao/db';
import {Mongoose} from 'mongoose';
import * as express from 'express';
import {UserSchemaGenerator} from './server/dao/user.model';
import {UserDao} from './server/dao/user.dao';
import {UserController} from './server/web/controllers/user.controller';
import {RouterManager} from './server/web/router.manager';
import {Startup} from './server/web/startup';
import {ErrorsHandler} from './server/web/middlewares/errors.handler';
import Injector from './server/cross/injector';

var init = function(port?: string){

    console.log('Up server in the port: ' + port);

    //Data Base
    var mongoose = new Mongoose();
    var db = new Db(mongoose);
    var userDao = new UserDao(db, UserSchemaGenerator.generate());
    Injector.register("userDao", userDao);
    
    //Controllers
    var userController = new UserController();

    //Routers
    var routers = new RouterManager(express.Router(), userController);

    //Application
    var app = new Startup(express(), routers, new ErrorsHandler());
    return app.listen(port);
}

module.exports = init;
export = init("3000");