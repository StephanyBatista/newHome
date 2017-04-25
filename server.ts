import * as model from "./server/model/index";
import {MongoClient} from "mongodb";
import * as express from 'express';
import {UserController} from './server/web/controllers/user.controller';
import {AdminController} from './server/web/controllers/admin.controller';
import {RouterManager} from './server/web/router.manager';
import {Startup} from './server/web/startup';
import {ErrorsHandler} from './server/web/middlewares/errors.handler';
import {Configuration, AnnotationMappingProvider, SessionFactory} from "hydrate-mongodb";
import {install as installSourceMaps} from "source-map-support";

installSourceMaps();

export function init(port: string, callback: (err?: Error, server?: Startup) => void): void {

    var config = new Configuration();
    // create indexes if not in production mode
    config.createIndexes = process.env.NODE_ENV == "production";
    // add model mapping
    config.addMapping(new AnnotationMappingProvider(model));

    MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
        if(err) return callback(err);

        config.createSessionFactory(db, (err, sessionFactory: SessionFactory) => {
            if(err) return callback(err);

            //Controllers
            var adminController = new AdminController();
            var userController = new UserController();

            //Routers
            var routers = new RouterManager(express.Router(), adminController, userController);

            //Application
            var app = new Startup(express(), routers, new ErrorsHandler(), sessionFactory);
            app.listen(port, (err) => {
                if (err) return callback(err);

                callback(null, app);
            });
        });
    });
}
