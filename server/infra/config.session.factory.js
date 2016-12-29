"use strict";
const mongodb_1 = require("mongodb");
const hydrate_mongodb_1 = require("hydrate-mongodb");
const user_1 = require("../model/user");
class ConfigSessionFactory {
    static setSessionFactory(sessionFactory) {
        this._current = sessionFactory;
    }
    static get current() {
        return this.current;
    }
    static session() {
        return this._current.createSession();
    }
    static create() {
        var config = new hydrate_mongodb_1.Configuration();
        config.addMapping(new hydrate_mongodb_1.AnnotationMappingProvider(user_1.User));
        mongodb_1.MongoClient.connect('mongodb://localhost/mydatabase', (err, db) => {
            if (err)
                throw err;
            config.createSessionFactory(db, (err, sessionFactory) => {
                var session = sessionFactory.createSession();
                session.query(user_1.User).findOne({ email: "req.body.email" }, (err, user) => {
                    var a = user;
                    var b = 1;
                });
            });
        });
    }
}
exports.ConfigSessionFactory = ConfigSessionFactory;
//# sourceMappingURL=config.session.factory.js.map