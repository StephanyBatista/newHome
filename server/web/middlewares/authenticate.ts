import {Request, Response} from 'express';
import {UserDao} from '../../dao/user.dao';
import {User} from '../../model/user';
import injector from '../../cross/injector';
var LocalStrategy = require('passport-local').Strategy;

export class Authenticate{

    public static initialize(passport: any, router: any){

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
        
        passport.use(new LocalStrategy(Authenticate.validateUser));

        router.get('/login', (req, res, next) => {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local', {
            successRedirect : '/admin/', 
            failureRedirect : '/login', 
        }));
    }

    static validateUser(username, password, done) {
        
        var userDao = <UserDao>injector.getRegistered("userDao");

        process.nextTick(async () => {
            
            var user = await userDao.getByEmailAndPassword(username, password);

            if(user)
                return done(null, user);
            else
                return done(null, false);
        });
    }    
}