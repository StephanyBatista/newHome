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
    update(user) {
        return this.model.update({
            email: user.email
        }, {
            $set: {
                name: user.name,
                birthday: user.birthday
            }
        }).exec();
    }
    delete(email) {
        return this.model.remove({
            email: email
        }).exec();
    }
    getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ email: email }, (error, userSaved) => {
                if (error)
                    reject(error);
                else if (userSaved)
                    resolve(new user_1.User(userSaved.id.toString(), userSaved.name, userSaved.email, userSaved.birthday));
                else
                    resolve(null);
            });
        });
    }
    getByEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            this.model.findOne({ email: email, password: password }, (error, userSaved) => {
                if (error)
                    reject(null);
                else if (userSaved)
                    resolve(new user_1.User(userSaved.id.toString(), userSaved.name, userSaved.email, userSaved.birthday));
                else
                    resolve(null);
            });
        });
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map