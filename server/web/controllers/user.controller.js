"use strict";
const User_1 = require("../../model/User");
const user_dao_1 = require("../../dao/user.dao");
class UserController {
    post(req, resp) {
        var user = new User_1.User(req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);
        var dao = new user_dao_1.UserDao();
        dao.save(user);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map