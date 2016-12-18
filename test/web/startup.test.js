"use strict";
const startup_1 = require("../../server/web/startup");
const chai_1 = require("chai");
describe('Web Startup', () => {
    it('should create the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { }
        };
        var startup = new startup_1.Startup(app);
        chai_1.assert.isDefined(startup.app);
    });
    it('should start the listen', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('3000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app);
        startup.listen();
    });
    it('should return a server', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { return {}; },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app);
        var server = startup.listen();
        chai_1.assert.isNotNull(server);
    });
    it('should haver a option to select the port of the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('4000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app);
        startup.listen('4000');
    });
});
//# sourceMappingURL=startup.test.js.map