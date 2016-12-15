"use strict";
const user_controller_1 = require("./controllers/user.controller");
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
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map