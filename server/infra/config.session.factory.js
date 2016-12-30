"use strict";
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
}
exports.ConfigSessionFactory = ConfigSessionFactory;
//# sourceMappingURL=config.session.factory.js.map