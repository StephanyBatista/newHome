"use strict";
class AdminController {
    newUser(req, resp, next) {
        resp.render("admin/user/create");
    }
    get(req, resp, next) {
        resp.render("admin/index");
    }
}
exports.AdminController = AdminController;
