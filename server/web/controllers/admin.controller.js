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
class AdminController {
    newUser(req, resp, next) {
        resp.render("admin/user/create");
    }
    updateUser(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var email = req.param('email');
            var entity = yield req.repository.get(user_1.User, { email: email });
            if (entity)
                resp.render("admin/user/update", { entity: entity });
            else
                resp.redirect("/admin/user/list");
        });
    }
    listUser(req, resp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var entities = yield req.repository.all(user_1.User);
            resp.render("admin/user/list", { entities: entities });
        });
    }
    get(req, resp, next) {
        resp.render("admin/index");
    }
}
exports.AdminController = AdminController;
