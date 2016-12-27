import {Application, Router} from 'express';
import {UserController} from './controllers/user.controller';
import {AdminController} from './controllers/admin.controller';
import {ErrorsHandler} from './middlewares/errors.handler';

export class RouterManager{

    readonly router: Router;
    
    constructor(
        router: Router, 
        adminController: AdminController,
        userController: UserController){
        
        this.router = router;
        this.router.get('/admin/', adminController.get);
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);        
    }   

    public isAuthenticated(req, res, next){
        
        if(req.isAuthenticated())
            next();
        else
            res.redirect("/login");
    }
}