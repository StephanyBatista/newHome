import {Server} from './server';
import kernel from "../inversify.config";

var init = function(){

    //var server = new Server();
    var server = kernel.get<Server>("Server");
}

export = init();