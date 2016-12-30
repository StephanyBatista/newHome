"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const user_1 = require("../../model/user");
class UserController {
    post(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                resp.json({ success: false, error: "Email was not informed" });
                return;
            }
            req.entityManager.query(user_1.User).findOne({ email: req.body.email }, (err, user) => {
                if (err)
                    return next(err);
                if (user) {
                    resp.json({ success: false, error: "User with same e-mail already exists" });
                    return;
                }
                // todo: need to fix this to correctly parse date and take timezone into account OR store date as string
                try {
                    user = new user_1.User(req.body.name, req.body.email, new Date(req.body.birthday));
                    user.updatePassword(req.body.password);
                }
                catch (err) {
                    return next(err);
                }
                req.entityManager.save(user);
                req.entityManager.close((err) => {
                    if (err)
                        return next(err);
                    resp.json({ success: true });
                });
            });
        });
    }
    put(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.entityManager.query(user_1.User).findOne({ email: req.body.email }, (err, user) => {
                if (err)
                    return next(err);
                if (!user) {
                    resp.json({ success: false, error: "User was not found" });
                    return;
                }
                // todo: need to fix this to correctly parse date and take timezone into account OR store date as string
                user.birthday = new Date(req.body.birthday);
                user.email = req.body.email;
                user.name = req.body.name;
                user.updatePassword(req.body.password);
                // you do not need to call session.save - dirty checking is automatic with the default change tracking
                req.entityManager.close((err) => {
                    if (err)
                        return next(err);
                    resp.json({ success: true });
                });
            });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map