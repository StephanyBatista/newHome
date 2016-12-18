import {Startup} from '../../server/web/startup';
import * as express from 'express';
import {assert} from 'chai';

describe('Web Startup', () => {
    
    it('should create the app', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {}
        };
        
        var startup = new Startup(app);

        assert.isDefined(startup.app);
    });

    it('should start the listen', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => {assert.equal('3000', port);},
            on: (type, func) => {}
        };
        
        var startup = new Startup(app);

        startup.listen();
    });

    it('should return a server', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => { return {}},
            on: (type, func) => {}
        };
        var startup = new Startup(app);

        var server = startup.listen();

        assert.isNotNull(server);
    });

    it('should haver a option to select the port of the app', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => {assert.equal('4000', port);},
            on: (type, func) => {}
        };
        var startup = new Startup(app);
        
        startup.listen('4000');
    });
});