"use strict";
const user_1 = require("../../server/model/user");
class UserDao {
    constructor(db, schema) {
        this.db = db;
        this.model = db.mongoose.model('User', schema);
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
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ email: email }, (error, userResp) => {
                if (error)
                    reject(error);
                resolve(new user_1.User(userResp.id.toString(), userResp.name, userResp.email, userResp.birthday));
            });
        });
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map