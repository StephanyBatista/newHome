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
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                next(new Error("Email was not informed"));
                return;
            }
            var user = yield req.repository.get(user_1.User, { email: req.body.email });
            if (user) {
                next(new Error("User with same e-mail already exists"));
                return;
            }
            try {
                user = new user_1.User(req.body.name, req.body.email, new Date(req.body.birthday));
                user.updatePassword(req.body.password);
                yield req.repository.save(user_1.User, user);
                res.sendResponse(user.id);
            }
            catch (err) {
                return next(err);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = yield req.repository.get(user_1.User, { email: req.body.email });
            if (!user) {
                next(new Error("User was not found"));
                return;
            }
            user.birthday = new Date(req.body.birthday);
            user.email = req.body.email;
            user.name = req.body.name;
            res.sendResponse(user.id);
        });
    }
}
exports.UserController = UserController;
