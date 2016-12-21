import {Db} from './server/dao/db';
import {Mongoose} from 'mongoose';
import * as express from 'express';
import {UserModel} from './server/dao/user.model';
import {UserDao} from './server/dao/user.dao';
import {UserController} from './server/web/controllers/user.controller';
import {RouterManager} from './server/web/router.manager';
import {Startup} from './server/web/startup'
import {ErrorsHandler} from './server/web/middlewares/errors.handler'

module.exports = function(port?: string){

    console.log('Up server in the port: ' + port);

    //Data Base
    var mongoose = new Mongoose();
    var db = new Db(mongoose);
    var userModel = new UserModel();
    var userDao = new UserDao(userModel.model);
    
    //Controllers
    var userController = new UserController(userDao);

    //Routers
    var routers = new RouterManager(express.Router(), userController);

    //Application
    var app = new Startup(express(), routers, new ErrorsHandler());
    var server = app.listen(port);
}