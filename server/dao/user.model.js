"use strict";
const mongoose_1 = require("mongoose");
class UserSchemaGenerator {
    static generate() {
        return new mongoose_1.Schema({
            name: String,
            email: String,
            birthday: Date,
            password: String
        });
    }
}
exports.UserSchemaGenerator = UserSchemaGenerator;
//# sourceMappingURL=user.model.js.map