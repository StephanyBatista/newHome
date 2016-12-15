import {Application} from 'express';
import * as express from 'express';
import {join} from 'path';
import * as logger from 'morgan';
import {json, urlencoded} from 'body-parser';
import {swig} from 'consolidate';
import cookieParser = require('cookie-parser');
import favicon = require('serve-favicon');

export class Startup{
    
    private _app: Application;

    get app(){
        return this._app;
    }
    
    constructor(app: Application){
        
        this._app = app;
        this._app.engine('html', swig);
        this._app.set('view engine', 'html');
        this._app.set('views', __dirname + '/views');   
        this._app.use(logger('dev'));
        this._app.use(json());
        this._app.use(urlencoded({ extended: true }));
        this._app.use(cookieParser());
        this._app.use(express.static(join(__dirname, 'public')));
        app.use(favicon(__dirname + '/public/images/favicon.ico'));
        
        //this.ConfigureNoFound();
        //this.ConfigureErrorMessageInDevelopment();
        //this.ConfigureError500();
    }

    private ConfigureNoFound(){

        this._app.use((req, res, next) => {
            var err = new Error('Not Found');
            err['status'] = 404;
            next(err);
        });
    }

    private ConfigureErrorMessageInDevelopment(){
        
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

    private ConfigureError500(){
        
        this._app.use((error: any, req, res, next) => {
            res.status(error['status'] || 500);
            res.render('error', {
                message: error.message,
                error: {}
            });
            return null;
        });
    }

    public Run(){

        this._app.set('port', process.env.PORT || '3000');
        this._app.listen(process.env.PORT || '3000', () => {console.log('exe')});
        this._app.on('error', (error) => {console.log(error);});
    }
}