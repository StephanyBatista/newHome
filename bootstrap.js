"use strict";
const db_1 = require("./server/dao/db");
const mongoose_1 = require("mongoose");
const express = require("express");
const user_model_1 = require("./server/dao/user.model");
const user_dao_1 = require("./server/dao/user.dao");
const user_controller_1 = require("./server/web/controllers/user.controller");
const router_manager_1 = require("./server/web/router.manager");
const startup_1 = require("./server/web/startup");
const errors_handler_1 = require("./server/web/middlewares/errors.handler");
module.exports = function (port) {
    console.log('Up server in the port: ' + port);
    //Data Base
    var mongoose = new mongoose_1.Mongoose();
    var db = new db_1.Db(mongoose);
    var userDao = new user_dao_1.UserDao(db, user_model_1.UserSchemaGenerator.generate());
    //Controllers
    var userController = new user_controller_1.UserController(userDao);
    //Routers
    var routers = new router_manager_1.RouterManager(express.Router(), userController);
    //Application
    var app = new startup_1.Startup(express(), routers, new errors_handler_1.ErrorsHandler());
    return app.listen(port);
};
//# sourceMappingURL=bootstrap.js.map