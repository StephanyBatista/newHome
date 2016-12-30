"use strict";
const express = require("express");
const session = require("express-session");
const path_1 = require("path");
const logger = require("morgan");
const body_parser_1 = require("body-parser");
const authenticate_1 = require("./middlewares/authenticate");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const consolidate = require("consolidate");
var passport = require('passport');
class Startup {
    get app() {
        return this._app;
    }
    constructor(app, routerManager, errorshandler, sessionFactory) {
        this.sessionFactory = sessionFactory;
        this._app = app;
        app.engine('html', consolidate.swig);
        this._app.set('view engine', 'html');
        this._app.set('views', __dirname + '/views');
        // create an entity manager for each web request
        this._app.use((req, res, next) => {
            req.entityManager = sessionFactory.createSession();
            next();
        });
        this._app.use(logger('dev'));
        this._app.use(body_parser_1.json());
        this._app.use(body_parser_1.urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(express.static(path_1.join(__dirname, 'public')));
        this._app.use(favicon(__dirname + '/public/images/favicon.ico'));
        this._app.use(session({ secret: '@s3c4etapp#%&*', resave: true, saveUninitialized: true }));
        this._app.use(passport.initialize());
        this._app.use(passport.session());
        authenticate_1.Authenticate.initialize(passport, routerManager.router);
        this._app.use('/', routerManager.router);
        // close the entity manager for each web request. this will flush any changes to the database. if an error occurs upstream it
        // should skip this step and not flush changes.
        this._app.use((req, res, next) => {
            req.entityManager.close(next);
        });
        this._app.use(errorshandler.generic);
        //this.configureNoFound();
        //this.configureErrorMessageInDevelopment();
        //this.configureError500();
    }
    configureNoFound() {
        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
    }
    configureErrorMessageInDevelopment() {
        if (this._app.get('env') === 'development') {
            this._app.use((error, req, res, next) => {
                res.status(error['status'] || 500);
                res.render('error', {
                    message: error.message,
                    error
                });
            });
        }
    }
    configureError500() {
        this._app.use((error, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }
    close(callback) {
        this._server.close(callback);
    }
    listen(port, callback) {
        if (!port || port == '')
            port = process.env.PORT || '3000';
        this._app.set('port', port);
        this._app.on('error', (error) => { console.log(error); });
        this._server = this._app.listen(port, callback);
    }
}
exports.Startup = Startup;
//# sourceMappingURL=startup.js.map