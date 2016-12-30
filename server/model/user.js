"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const domain_exception_1 = require("./domain.exception");
const hydrate_mongodb_1 = require("hydrate-mongodb");
let User = class User {
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
    get password() {
        return this._password;
    }
    updatePassword(password) {
        this._password = password;
    }
    hasId() {
        return this.id != null && this.id != '';
    }
};
__decorate([
    hydrate_mongodb_1.Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    hydrate_mongodb_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    hydrate_mongodb_1.Field(),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    hydrate_mongodb_1.Field(),
    __metadata("design:type", String)
], User.prototype, "_password", void 0);
User = __decorate([
    hydrate_mongodb_1.Entity(),
    __metadata("design:paramtypes", [String, String, String, Date])
], User);
exports.User = User;
//# sourceMappingURL=user.js.map