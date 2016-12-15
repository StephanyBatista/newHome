"use strict";
const express = require("express");
const path_1 = require("path");
const logger = require("morgan");
const body_parser_1 = require("body-parser");
const consolidate_1 = require("consolidate");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
class Startup {
    get app() {
        return this._app;
    }
    constructor(app) {
        this._app = app;
        this._app.engine('html', consolidate_1.swig);
        this._app.set('view engine', 'html');
        this._app.set('views', __dirname + '/views');
        this._app.use(logger('dev'));
        this._app.use(body_parser_1.json());
        this._app.use(body_parser_1.urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(express.static(path_1.join(__dirname, 'public')));
        app.use(favicon(__dirname + '/public/images/favicon.ico'));
        //this.ConfigureNoFound();
        //this.ConfigureErrorMessageInDevelopment();
        //this.ConfigureError500();
    }
    ConfigureNoFound() {
        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
    }
    ConfigureErrorMessageInDevelopment() {
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
    ConfigureError500() {
        this._app.use((error, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }
    Run() {
        this._app.set('port', process.env.PORT || '3000');
        this._app.listen(process.env.PORT || '3000', () => { console.log('exe'); });
        this._app.on('error', (error) => { console.log(error); });
    }
}
exports.Startup = Startup;
//# sourceMappingURL=startup.js.map