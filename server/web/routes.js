"use strict";
class Routes {
    constructor(router) {
        this.router = router;
        this.Configure();
    }
    Configure() {
        this.router.post('/api/v1/user', (req, res) => { });
    }
    Apply(app) {
        this.app.use('/', this.router);
    }
}
exports.Routes = Routes;
