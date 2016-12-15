import * as express from 'express';
import {Startup} from './startup';

var app = express();
var startup = new Startup(app);
startup.Run();
