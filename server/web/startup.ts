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
import {Server} from "http";
import {SessionFactory} from "hydrate-mongodb";
import {ExpressRequest, ExpressResponse} from "./expressRequest";

var passport = require('passport');

export class Startup {
    
    private _app: Application;
    private _server: Server;

    sessionFactory: SessionFactory;

    get app(){
        return this._app;
    }
    
    constructor(app: Application, routerManager: RouterManager, errorshandler: ErrorsHandler, sessionFactory: SessionFactory) {

        this.sessionFactory = sessionFactory;
        this._app = app;
        app.engine('html', consolidate.swig);
        this._app.set('view engine', 'html');
        this._app.set('views', __dirname + '/views');

        // create an entity manager for each web request
        this._app.use((req: ExpressRequest, res: ExpressResponse, next: express.NextFunction) => {

            // add hydrate session to request object
            req.entityManager = sessionFactory.createSession();

            // add to response object method for closing the hydrate session and sending a JSON response
            res.sendResponse = (value?: any) => {

                // close the hydrate session before sending the response to make sure everything flushed to the database ok
                req.entityManager.close((err) => {
                    if (err) {
                        // send error
                        res.status(500).json({ success: false, error: err.message });
                    }
                    else {
                        // send the response
                        res.json({ success: true, result: value });
                    }
                });
            };

            next();
        });

        this._app.use(logger('dev'));
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(express.static(join(__dirname, 'public')));
        this._app.use(favicon(__dirname + '/public/images/favicon.ico'));
        this._app.use(session({secret: '@s3c4etapp#%&*', resave: true, saveUninitialized: true}));
        this._app.use(passport.initialize());
        this._app.use(passport.session());
        Authenticate.initialize(passport);
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

    public close(callback: (err?: Error) => void): void {

        this._server.close(callback);
    }

    public listen(port: string, callback: (err?: Error) => void): void {

        if(!port || port == '')
            port = process.env.PORT || '3000';
        
        this._app.set('port', port);
        this._app.on('error', (error) => {console.log(error);});
        this._server = this._app.listen(port, callback);
    }
}