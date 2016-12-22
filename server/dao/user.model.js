"use strict";
const mongoose_1 = require("mongoose");
class UserSchemaGenerator {
    static generate() {
        return new mongoose_1.Schema({
            name: { type: String, required: true },
            email: { type: String, index: true, unique: true, required: true },
            birthday: { type: Date, required: true },
            password: { type: String, required: true }
        });
    }
}
exports.UserSchemaGenerator = UserSchemaGenerator;
//# sourceMappingURL=user.model.js.map