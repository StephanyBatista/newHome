"use strict";
class AdminController {
    get(req, resp, next) {
        resp.render("admin/index");
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map