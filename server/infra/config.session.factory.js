"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongodb_1 = require("mongodb");
const hydrate_mongodb_1 = require("hydrate-mongodb");
const model = require("../model/user");
const injector_1 = require("../cross/injector");
require("reflect-metadata");
class ConfigSessionFactory {
    static create() {
        var config = new hydrate_mongodb_1.Configuration();
        config.addMapping(new hydrate_mongodb_1.AnnotationMappingProvider(model));
        mongodb_1.MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
            if (err)
                throw err;
            config.createSessionFactory(db, (err, sessionFactory) => __awaiter(this, void 0, void 0, function* () {
                var session = sessionFactory.createSession();
                var userSaved = yield session.query(model.User).findOne({ email: "aaaa" }).asPromise();
                injector_1.default.register("sessionFactory", sessionFactory);
            }));
        });
    }
}
exports.ConfigSessionFactory = ConfigSessionFactory;
//# sourceMappingURL=config.session.factory.js.map