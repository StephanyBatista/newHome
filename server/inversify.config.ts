import {Kernel} from "inversify";
import {Server} from './web/server';

var kernel = new Kernel();
kernel.bind<Server>("Server").to(Server);

export default kernel;
