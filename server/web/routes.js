"use strict";
const user_controller_1 = require("./controllers/user.controller");
const errors_handler_1 = require("./middlewares/errors.handler");
class Routes {
    constructor(router) {
        this.router = router;
        this.Configure();
    }
    Configure() {
        var user = new user_controller_1.UserController();
        this.router.post('/api/v1/user', user.post);
    }
    Apply(app) {
        app.use('/', this.router);
        var errorshandler = new errors_handler_1.ErrorsHandler();
        app.use(errorshandler.generic);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map