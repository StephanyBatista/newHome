import {Application, Router} from 'express';
import {UserController} from './controllers/user.controller';
import {ErrorsHandler} from './middlewares/errors.handler';

export class RouterManager{

    readonly router: Router;
    
    constructor(router: Router, userController: UserController){
        
        this.router = router;

        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);
    }   
}