"use strict";
const model = require("./server/model/index");
const mongodb_1 = require("mongodb");
const express = require("express");
const user_controller_1 = require("./server/web/controllers/user.controller");
const admin_controller_1 = require("./server/web/controllers/admin.controller");
const router_manager_1 = require("./server/web/router.manager");
const startup_1 = require("./server/web/startup");
const errors_handler_1 = require("./server/web/middlewares/errors.handler");
const hydrate_mongodb_1 = require("hydrate-mongodb");
const source_map_support_1 = require("source-map-support");
source_map_support_1.install();
function init(port, callback) {
    var config = new hydrate_mongodb_1.Configuration();
    config.addMapping(new hydrate_mongodb_1.AnnotationMappingProvider(model));
    mongodb_1.MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
        if (err)
            return callback(err);
        config.createSessionFactory(db, (err, sessionFactory) => {
            if (err)
                return callback(err);
            //Controllers
            var adminController = new admin_controller_1.AdminController();
            var userController = new user_controller_1.UserController();
            //Routers
            var routers = new router_manager_1.RouterManager(express.Router(), adminController, userController);
            //Application
            var app = new startup_1.Startup(express(), routers, new errors_handler_1.ErrorsHandler(), sessionFactory);
            app.listen(port, (err) => {
                if (err)
                    return callback(err);
                callback(null, app);
            });
        });
    });
}
exports.init = init;
//# sourceMappingURL=server.js.map