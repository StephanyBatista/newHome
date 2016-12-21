"use strict";
const domain_exception_1 = require("./domain.exception");
class User {
    get password() {
        return this._password;
    }
    constructor(id, name, email, birthday) {
        domain_exception_1.DomainException.when(name == null || name == '', "Name is required");
        domain_exception_1.DomainException.when(email == null || email == '', "E-mail is required");
        domain_exception_1.DomainException.when(birthday == null, "Birthday is required");
        if (id)
            this.id = id;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }
    updatePassword(password) {
        this._password = password;
    }
    hasId() {
        return this.id != null && this.id != '';
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map