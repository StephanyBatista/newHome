"use strict";
const mongoose_1 = require("mongoose");
const db_1 = require("../../server/dao/db");
const chai_1 = require("chai");
describe('DB', () => {
    var mongoose = new mongoose_1.Mongoose();
    beforeEach(() => {
        var mockgoose = require('mockgoose');
        mockgoose(mongoose);
    });
    it('Must define mongoose', () => {
        var db = new db_1.Db(mongoose);
        chai_1.assert.isDefined(db.mongoose);
    });
});
//# sourceMappingURL=dao.test.js.map