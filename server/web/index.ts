import * as express from 'express';
import {Startup} from './startup';
import {Server} from './server';

var app = express();
var startup = new Startup(app);
var server = new Server(startup);