"use strict";
class RouterManager {
    constructor(router, userController) {
        this.router = router;
        this.router.post('/api/v1/user', userController.post);
    }
}
exports.RouterManager = RouterManager;
//# sourceMappingURL=router.manager.js.map