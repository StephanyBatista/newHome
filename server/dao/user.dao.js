"use strict";
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../server/dao/user.model");
class UserDao {
    constructor(model) {
        var mongoose = new mongoose_1.Mongoose();
        mongoose.connect('mongodb://localhost/newHome');
        this.model = model;
        if (this.model == null)
            this.model = new user_model_1.UserModel().model;
    }
    save(user) {
        var document = new this.model({
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            password: user.password
        });
        return document.save();
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map