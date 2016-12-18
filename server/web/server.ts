import {injectable} from "inversify";
import * as express from 'express';
import {Startup} from './startup';
import {Routes} from './Routes';

@injectable()
export class Server{

    readonly _server: any;
    
    constructor(port?: string){

        var app = express();
        var startup = new Startup(app);
        var routes = new Routes(express.Router());
        routes.Apply(app);
        this._server = startup.listen(port);
    }

    public close(){
        
        this._server.close();
    }
}
