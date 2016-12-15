"use strict";
const http = require("http");
class Server {
    constructor(startup) {
        this.port = process.env.PORT || '3000';
        startup.setPort(this.port);
        this.server = http.createServer(startup.app);
        this.server.listen(this.port);
        this.server.on('error', (error) => { console.log(error); });
        this.server.on('listening', () => { console.log('listening'); });
    }
}
exports.Server = Server;
