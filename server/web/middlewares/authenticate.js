"use strict";
const injector_1 = require("../../cross/injector");
var LocalStrategy = require('passport-local').Strategy;
class Authenticate {
    constructor(passport, router) {
        this.configure(passport, router);
    }
    configure(passport, router) {
        var userDao = injector_1.default.getRegistered("userDao");
        passport.serializeUser((user, done) => {
            done(null, user.email);
        });
        passport.deserializeUser((email, done) => {
            userDao.getByEmail(email).then((user) => {
                done(null, user);
            }, (error) => {
                done(error, null);
            });
        });
        passport.use(new LocalStrategy({ userNameField: 'email', passwordField: 'password' }, Authenticate.validateUser));
        router.put('/signup', passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
        }));
    }
    static validateUser(username, password, done) {
        var userDao = injector_1.default.getRegistered("userDao");
        process.nextTick(() => {
            userDao.getByEmail(username).then((user) => {
                if (!user) {
                    return done(null, false);
                }
                if (user.password != password) {
                    return done(null, false);
                }
                return done(null, user);
            }, (error) => {
                return done(error);
            });
        });
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=authenticate.js.map