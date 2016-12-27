import {Application} from 'express';
import * as express from 'express';
import * as session from 'express-session';
import {join} from 'path';
import * as logger from 'morgan';
import {json, urlencoded} from 'body-parser';
import {RouterManager} from './router.manager';
import {ErrorsHandler} from './middlewares/errors.handler'
import {Authenticate} from './middlewares/authenticate';
import favicon = require('serve-favicon');
import cookieParser = require('cookie-parser');
import consolidate = require('consolidate');

var passport = require('passport');

export class Startup{
    
    private _app: Application;

    get app(){
        return this._app;
    }
    
    constructor(app: Application, routerManager: RouterManager, errorshandler: ErrorsHandler){
        
        this._app = app;
        app.engine('html', consolidate.swig);
        this._app.set('view engine', 'html');
        this._app.set('views', __dirname + '/views');   
        this._app.use(logger('dev'));
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(express.static(join(__dirname, 'public')));
        this._app.use(favicon(__dirname + '/public/images/favicon.ico'));
        this._app.use(session({secret: '@s3c4etapp#%&*', resave: true, saveUninitialized: true}));
        this._app.use(passport.initialize());
        this._app.use(passport.session());
        Authenticate.initialize(passport, routerManager.router);
        this._app.use('/', routerManager.router);
        this._app.use(errorshandler.generic);
        //this.configureNoFound();
        //this.configureErrorMessageInDevelopment();
        //this.configureError500();
    }

    private configureNoFound(){

        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
    }

    private configureErrorMessageInDevelopment(){
        
        if (this._app.get('env') === 'development') {
            this._app.use((error: any, req, res, next) => {
                res.status(error['status'] || 500);
                res.render('error', {
                    message: error.message,
                    error
                });
            });
        }
    }

    private configureError500(){
        
        this._app.use((error: any, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }

    public listen(port?: string){

        if(!port || port == '')
            port = process.env.PORT || '3000';
        
        this._app.set('port', port);
        this._app.on('error', (error) => {console.log(error);});
        return this._app.listen(port, () => {});
    }
}