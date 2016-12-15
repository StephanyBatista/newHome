"use strict";
const express = require("express");
const startup_1 = require("./startup");
var app = express();
var startup = new startup_1.Startup(app);
startup.Run();
