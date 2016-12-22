"use strict";
class Db {
    constructor() {
        var mongoose = require('mongoose');
        mongoose.Promise = require('bluebird');
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map