"use strict";
const user_1 = require("../../model/user");
var LocalStrategy = require('passport-local').Strategy;
class Authenticate {
    static initialize(passport) {
        passport.serializeUser((req, user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((req, id, done) => {
            req.entityManager.find(user_1.User, id, done);
        });
        // tell passport to pass the request to the callback so that we can use the current entity manager
        passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
            req.entityManager.query(user_1.User).findOne({ email: username }, (err, user) => {
                if (err)
                    return done(err);
                // findOne returns null if user is not found. if we found the user then make sure the passwords match
                if (user && user.verifyPassword(password)) {
                    done(null, user);
                }
                else {
                    done(new Error("Usuário não encontrado"), false);
                }
            });
        }));
    }
}
exports.Authenticate = Authenticate;
//# sourceMappingURL=authenticate.js.map