"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const injector_1 = require("../../cross/injector");
var LocalStrategy = require('passport-local').Strategy;
class Authenticate {
    static initialize(passport, router) {
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
        passport.use(new LocalStrategy(Authenticate.validateUser));
        router.get('/login', (req, res, next) => {
            res.render('login');
        });
        router.post('/login', passport.authenticate('local', {
            successRedirect: '/admin/',
            failureRedirect: '/login',
        }));
    }
    static validateUser(username, password, done) {
        var userDao = injector_1.default.getRegistered("userDao");
        process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
            var user = yield userDao.getByEmailAndPassword(username, password);
            if (user)
                return done(null, user);
            else
                return done(null, false);
        }));
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=authenticate.js.map