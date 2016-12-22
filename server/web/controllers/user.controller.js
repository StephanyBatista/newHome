"use strict";
const User_1 = require("../../model/User");
class UserController {
    constructor(userDao) {
        this._userDao = userDao;
    }
    post(req, resp, next) {
        var user = new User_1.User(req.body.id, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);
        this._userDao.save(user).then(() => {
            resp.json({ success: true });
        }, (error) => {
            resp.json({ success: false });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map