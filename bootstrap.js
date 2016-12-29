"use strict";
const db_1 = require("./server/dao/db");
const mongodb_1 = require("mongodb");
const express = require("express");
const user_model_1 = require("./server/dao/user.model");
const user_dao_1 = require("./server/dao/user.dao");
const user_controller_1 = require("./server/web/controllers/user.controller");
const admin_controller_1 = require("./server/web/controllers/admin.controller");
const router_manager_1 = require("./server/web/router.manager");
const startup_1 = require("./server/web/startup");
const errors_handler_1 = require("./server/web/middlewares/errors.handler");
const hydrate_mongodb_1 = require("hydrate-mongodb");
const config_session_factory_1 = require("./server/infra/config.session.factory");
const user_1 = require("./server/model/user");
const injector_1 = require("./server/cross/injector");
var init = function (port) {
    config_session_factory_1.ConfigSessionFactory.create();
    var config = new hydrate_mongodb_1.Configuration();
    config.addMapping(new hydrate_mongodb_1.AnnotationMappingProvider(user_1.User));
    mongodb_1.MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
        if (err)
            throw err;
        config.createSessionFactory(db, (err, sessionFactory) => {
            config_session_factory_1.ConfigSessionFactory.setSessionFactory(sessionFactory);
            //Data Base    
            var db = new db_1.Db();
            var userDao = new user_dao_1.UserDao(db, user_model_1.UserSchemaGenerator.generate());
            injector_1.default.register("userDao", userDao);
            //Controllers
            var adminController = new admin_controller_1.AdminController();
            var userController = new user_controller_1.UserController();
            //Routers
            var routers = new router_manager_1.RouterManager(express.Router(), adminController, userController);
            //Application
            var app = new startup_1.Startup(express(), routers, new errors_handler_1.ErrorsHandler());
            return app.listen(port);
        });
    });
};
module.exports = init;
module.exports = init("3000");
//# sourceMappingURL=bootstrap.js.map