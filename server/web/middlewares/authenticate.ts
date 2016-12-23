import {UserDao} from '../../dao/user.dao';
import {User} from '../../model/user';
import injector from '../../cross/injector';
var LocalStrategy = require('passport-local').Strategy;

export class Authenticate{

    constructor(passport: any, router: any){

        this.configure(passport, router);
    }

    private configure(passport: any, router: any){

        var userDao = <UserDao>injector.getRegistered("userDao");
        
        passport.serializeUser((user: User, done: any) => {
		    
            done(null, user.email);
        });

        passport.deserializeUser((email, done) => {
            
            userDao.getByEmail(email).then(
                (user: User) => {
                    done(null, user);
                },
                (error) =>{
                    done(error, null);
                }
            );
        });
        
        passport.use(new LocalStrategy(
            {userNameField: 'email', passwordField: 'password'}, 
            Authenticate.validateUser));

        router.put('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', 
            failureRedirect : '/signup', 
        }));
    }

    static validateUser(username, password, done) {
        
        var userDao = <UserDao>injector.getRegistered("userDao");
        
        process.nextTick(() => {
            userDao.getByEmail(username).then(
                (user: User) => {
                    if (!user) {
                        return done(null, false);
                    }

                    if (user.password != password) {
                        return done(null, false);
                    }

                    return done(null, user);
                },
                (error) => {
                    return done(error);
                }
            );
        });
    }    
}