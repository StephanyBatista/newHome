"use strict";
class RouterManager {
    constructor(router, userController) {
        this.router = router;
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);
    }
}
exports.RouterManager = RouterManager;
//# sourceMappingURL=router.manager.js.map