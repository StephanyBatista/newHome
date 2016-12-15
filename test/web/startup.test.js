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
    it('should run the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('3000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app);
        startup.Run();
    });
    it('should select the port of the app', () => {
        var app = {
            use: (param) => { },
            set: (param1, param2) => { },
            get: (param) => { return ''; },
            engine: (param1, param2) => { },
            listen: (port, func) => { chai_1.assert.equal('4000', port); },
            on: (type, func) => { }
        };
        var startup = new startup_1.Startup(app);
        startup.Listen('4000');
        startup.Run();
    });
});
//# sourceMappingURL=startup.test.js.map