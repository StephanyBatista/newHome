import {Startup} from './startup'
import http = require('http')
import * as express from 'express';

export class Server{

    readonly port: string;
    readonly server: http.Server;
    
    constructor(startup: Startup){
        
        this.port = process.env.PORT || '3000';
        startup.setPort(this.port);

        this.server = http.createServer(startup.app);
        this.server.listen(this.port);
        
        this.server.on('error', (error) => {console.log(error);});
        this.server.on('listening', () => {console.log('listening')});    
    }
}
