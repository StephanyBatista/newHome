"use strict";
const mongoose_1 = require("mongoose");
class UserModel {
    constructor() {
        var mongoose = new mongoose_1.Mongoose();
        this.model = mongoose.model('User', this.generateSchema());
    }
    generateSchema() {
        return new mongoose_1.Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map