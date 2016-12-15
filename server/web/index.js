"use strict";
const express = require("express");
const startup_1 = require("./startup");
const server_1 = require("./server");
var app = express();
var startup = new startup_1.Startup(app);
var server = new server_1.Server(startup);
