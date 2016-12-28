import {Db} from './server/dao/db';
import {Mongoose} from 'mongoose';
import * as express from 'express';
import {UserSchemaGenerator} from './server/dao/user.model';
import {UserDao} from './server/dao/user.dao';
import {UserController} from './server/web/controllers/user.controller';
import {AdminController} from './server/web/controllers/admin.controller';
import {RouterManager} from './server/web/router.manager';
import {Startup} from './server/web/startup';
import {ErrorsHandler} from './server/web/middlewares/errors.handler';
import Injector from './server/cross/injector';
import {ConfigSessionFactory} from './server/infra/config.session.factory'

var init = function(port?: string){

    console.log('Up server in the port: ' + port);

    ConfigSessionFactory.create();

    //Data Base
    var db = new Db();
    var userDao = new UserDao(db, UserSchemaGenerator.generate());
    Injector.register("userDao", userDao);
    
    //Controllers
    var adminController = new AdminController();
    var userController = new UserController();

    //Routers
    var routers = new RouterManager(express.Router(), adminController, userController);

    //Application
    var app = new Startup(express(), routers, new ErrorsHandler());
    return app.listen(port);
}

module.exports = init;
export = init("3000");