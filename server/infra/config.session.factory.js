"use strict";
const mongodb_1 = require("mongodb");
const hydrate_mongodb_1 = require("hydrate-mongodb");
const model = require("../model/user");
const injector_1 = require("../cross/injector");
class ConfigSessionFactory {
    static create() {
        var config = new hydrate_mongodb_1.Configuration();
        config.addMapping(new hydrate_mongodb_1.AnnotationMappingProvider(model));
        mongodb_1.MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
            if (err)
                throw err;
            config.createSessionFactory(db, (err, sessionFactory) => {
                injector_1.default.register("sessionFactory", sessionFactory);
            });
        });
    }
}
exports.ConfigSessionFactory = ConfigSessionFactory;
//# sourceMappingURL=config.session.factory.js.map