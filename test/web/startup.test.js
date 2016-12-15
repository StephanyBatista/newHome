"use strict";
const startup_1 = require("../../server/web/startup");
const chai_1 = require("chai");
var app = {
    use: (param) => { },
    set: (param1, param2) => { },
    get: (param) => { return ''; }
};
describe('Web Startup', () => {
    it('should create the app', () => {
        var startup = new startup_1.Startup(app);
        chai_1.assert.isDefined(startup.app);
    });
});
