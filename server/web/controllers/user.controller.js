"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const User_1 = require("../../model/User");
const injector_1 = require("../../cross/injector");
class UserController {
    post(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                resp.json({ success: false, error: "Email was not informed" });
                return;
            }
            var userDao = injector_1.default.getRegistered("userDao");
            var userSaved = yield userDao.getByEmail(req.body.email);
            if (userSaved) {
                resp.json({ success: false, error: "User with same e-mail already exists" });
                return;
            }
            try {
                var user = new User_1.User(null, req.body.name, req.body.email, req.body.birthday);
                user.updatePassword(req.body.password);
                yield userDao.save(user);
                resp.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
    put(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var userDao = injector_1.default.getRegistered("userDao");
            var userSaved = yield userDao.getByEmail(req.body.email);
            if (!userSaved)
                resp.json({ success: false, error: "User was not found" });
            else {
                var user = new User_1.User(null, req.body.name, req.body.email, req.body.birthday);
                userDao.update(user).then(() => {
                    resp.json({ success: true });
                }, (error) => {
                    resp.json({ success: false, error: error });
                });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map