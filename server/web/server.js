"use strict";
const express = require("express");
const startup_1 = require("./startup");
const Routes_1 = require("./Routes");
var app = express();
var startup = new startup_1.Startup(app);
var routes = new Routes_1.Routes(express.Router());
routes.Apply(app);
startup.Run();
//# sourceMappingURL=server.js.map