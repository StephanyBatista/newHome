"use strict";
const express = require("express");
const path_1 = require("path");
const logger = require("morgan");
const body_parser_1 = require("body-parser");
const cookieParser = require("cookie-parser");
class Startup {
    get app() {
        return this._app;
    }
    constructor(application) {
        this._app = application;
        this._app.set('views', path_1.join(__dirname, 'views'));
        this._app.set('view engine', 'jade');
        this._app.use(logger('dev'));
        this._app.use(body_parser_1.json());
        this._app.use(body_parser_1.urlencoded({ extended: false }));
        this._app.use(cookieParser());
        this._app.use(express.static(path_1.join(__dirname, 'public')));
        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
        if (this._app.get('env') === 'development') {
            this._app.use((error, req, res, next) => {
                res.status(error['status'] || 500);
                res.render('error', {
                    message: error.message,
                    error
                });
            });
        }
        this._app.use((error, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }
    setPort(port) {
        this._app.set('port', port);
    }
}
exports.Startup = Startup;
