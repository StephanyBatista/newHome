import * as express from 'express';
import {Startup} from './startup';
import {Routes} from './Routes';

var app = express();
var startup = new Startup(app);
var routes = new Routes(express.Router());
routes.Apply(app);
startup.Run();
