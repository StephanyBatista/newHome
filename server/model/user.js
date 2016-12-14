"use strict";
const DomainException_1 = require("./DomainException");
class User {
    get password() {
        return this._password;
    }
    constructor(name, email, birthday) {
        DomainException_1.DomainException.when(name == null || name == '', "Name is required");
        DomainException_1.DomainException.when(email == null || email == '', "E-mail is required");
        DomainException_1.DomainException.when(birthday == null, "Birthday is required");
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }
    updatePassword(password) {
        this._password = password;
    }
}
exports.User = User;
