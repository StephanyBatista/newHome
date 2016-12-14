"use strict";
const mongoose_1 = require("mongoose");
class UserDao {
    constructor(model) {
        var mongoose = new mongoose_1.Mongoose();
        mongoose.connect('mongodb://localhost/newHome');
        this.model = model;
    }
    generateSchema() {
        return new mongoose_1.Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }
    save(user) {
        new this.model({
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            password: user.password
        }).save();
    }
}
module.exports = UserDao;
