import {Startup} from '../../server/web/startup';
import * as express from 'express';
import {assert} from 'chai';

var app = <express.Application>{
    use: (param: any) => {},
    set: (param1: any, param2: any) => {},
    get: (param: any) => {return ''}
};

describe('Web Startup', () => {
    
    it('should create the app', () =>  {
        
        var startup = new Startup(app);

        assert.isDefined(startup.app);
    });
});