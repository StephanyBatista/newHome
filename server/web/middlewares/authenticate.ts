import {User} from '../../model/user';
import {ExpressRequest} from "../expressRequest";
var LocalStrategy = require('passport-local').Strategy;

export class Authenticate {

    public static initialize(passport: any, router: any){

        passport.serializeUser((req: ExpressRequest, user: User, done: any) => {

            done(null, user.id);
        });

        passport.deserializeUser((req: ExpressRequest, id: string, done: any) => {

            req.entityManager.find(User, id, done);
        });

        // tell passport to pass the request to the callback so that we can use the current entity manager
        passport.use(new LocalStrategy({ passReqToCallback: true }, (req: ExpressRequest, username, password, done) => {

            req.entityManager.query(User).findOne({ email: username }, (err, user) => {
                if (err) return done(err);

                // findOne returns null if user is not found. if we found the user then make sure the passwords match
                // todo: store password hashed. checkout them module 'bcrypt-nodejs'
                if (user && user.password == password) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            });
        }));
    }
}
