"use strict";
const inversify_1 = require("inversify");
const server_1 = require("./web/server");
var kernel = new inversify_1.Kernel();
kernel.bind("Server").to(server_1.Server);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = kernel;
//# sourceMappingURL=inversify.config.js.map