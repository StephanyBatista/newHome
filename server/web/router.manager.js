"use strict";
class RouterManager {
    constructor(router, userController, adminController) {
        this.router = router;
        this.router.get('/');
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);
        this.router.get('/admin', adminController.get);
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