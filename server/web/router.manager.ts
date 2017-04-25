import {Application, Router} from 'express';
import {UserController} from './controllers/user.controller';
import {AdminController} from './controllers/admin.controller';
import {ErrorsHandler} from './middlewares/errors.handler';
var passport = require('passport');

export class RouterManager{

    readonly router: Router;
    
    constructor(
        router: Router,
        adminController: AdminController,
        userController: UserController){
        
        this.router = router;

        router.get('/login', (req, res, next) => {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local', {
            successRedirect : '/admin/',
            failureRedirect : '/login',
        }));

        this.router.get('/admin/user/create', adminController.newUser);
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);  

        //protected resources
        this.router.all("*", (req, res, next) => {

            if(req.isAuthenticated()) {
                next();
            }
            else {
                res.redirect("/login");
            }
        });

        this.router.get('/admin/', adminController.get);
    }
}