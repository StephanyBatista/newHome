"use strict";
const mongoose_1 = require("mongoose");
class UserModel {
    constructor() {
        var uri = 'mongodb://localhost/newHome';
        var mongoose = new mongoose_1.Mongoose();
        var db = mongoose.connect(uri);
        this.model = db.model('User', this.generateSchema());
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