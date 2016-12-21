"use strict";
const User_1 = require("../../model/User");
const user_dao_1 = require("../../dao/user.dao");
class UserController {
    constructor(userDao) {
        this._userDao = userDao;
    }
    post(req, resp, next) {
        var user = new User_1.User(req.body.id, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);
        var dao = new user_dao_1.UserDao();
        dao.save(user).then(() => {
            resp.json({ success: true });
        }, (error) => {
            resp.json({ success: false });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map