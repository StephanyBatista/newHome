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

    it('should run the app', () =>  {
        
        var app = <express.Application>{
            use: (param: any) => {},
            set: (param1: any, param2: any) => {},
            get: (param: any) => {return ''},
            engine: (param1: any, param2: any) => {},
            listen: (port, func) => {assert.equal('3000', port);},
            on: (type, func) => {}
        };
        
        var startup = new Startup(app);

        startup.Run();
    });
});