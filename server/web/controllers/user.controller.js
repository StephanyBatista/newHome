"use strict";
const User_1 = require("../../model/User");
const injector_1 = require("../../cross/injector");
class UserController {
    post(req, resp, next) {
        var userDao = injector_1.default.getRegistered("userDao");
        userDao.getByEmail(req.body.email).then((userSaved) => {
            if (userSaved)
                resp.json({ success: false, error: "User with same e-mail already exists" });
            return UserController.saveUser(req, resp, userDao);
        }).catch((error) => {
            resp.json({ success: false, error: error });
        });
    }
    static saveUser(req, resp, userDao) {
        var user = new User_1.User(null, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);
        userDao.save(user).then(() => {
            resp.json({ success: true });
        }, (error) => {
            resp.json({ success: false, error: error });
        });
    }
    put(req, resp, next) {
        var userDao = injector_1.default.getRegistered("userDao");
        userDao.getByEmail(req.body.email).then((userSaved) => {
            if (!userSaved)
                resp.json({ success: false, error: "User was not found" });
            var user = new User_1.User(null, req.body.name, req.body.email, req.body.birthday);
            userDao.update(user).then(() => {
                resp.json({ success: true });
            }, (error) => {
                resp.json({ success: false, error: error });
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map