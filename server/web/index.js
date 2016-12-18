"use strict";
const inversify_config_1 = require("../inversify.config");
var init = function () {
    //var server = new Server();
    var server = inversify_config_1.default.get("Server");
};
module.exports = init();
//# sourceMappingURL=index.js.map