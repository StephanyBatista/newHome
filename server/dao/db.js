"use strict";
class Db {
    constructor(mongoose) {
        this.mongoose = mongoose.connect('mongodb://localhost/newHome');
        this.mongoose.connection.db.Promise = require('bluebird');
    }
    clone() {
        if (this.mongoose.connection)
            this.mongoose.connection.close();
    }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map