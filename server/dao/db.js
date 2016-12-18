"use strict";
class Db {
    constructor(mongoose) {
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map