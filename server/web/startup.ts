import * as express from 'express';
import {join} from 'path';
import * as logger from 'morgan';
import {json, urlencoded} from 'body-parser';
import cookieParser = require('cookie-parser');

export class Startup{
    
    private _app: express.Application;

    get app(){
        return this._app;
    }
    
    constructor(){
        this._app = express();
        this._app.set('views', join(__dirname, 'views'));
        this._app.set('view engine', 'jade');    
        this._app.use(logger('dev'));
        this._app.use(json());
        this._app.use(urlencoded({ extended: false }));
        this._app.use(cookieParser());
        this._app.use(express.static(join(__dirname, 'public')));

        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });

        if (this._app.get('env') === 'development') {
            this._app.use((error: any, req, res, next) => {
                res.status(error['status'] || 500);
                res.render('error', {
                    message: error.message,
                    error
                });
            });
        }

        this._app.use((error: any, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }

    public setPort(port: string){
        this._app.set('port', port);
    }
}