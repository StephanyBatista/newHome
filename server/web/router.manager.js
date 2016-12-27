"use strict";
class RouterManager {
    constructor(router, adminController, userController) {
        this.router = router;
        this.router.get('/admin/', adminController.get);
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);
    }
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            next();
        else
            res.redirect("/login");
    }
}
exports.RouterManager = RouterManager;
//# sourceMappingURL=router.manager.js.map