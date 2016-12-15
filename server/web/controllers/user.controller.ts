import {Request, Response} from 'express';
import {User} from '../../model/User';
import {UserDao} from '../../dao/user.dao';
import {UserModel} from '../../dao/user.model';

export class UserController{

    public post(req, resp){
        
        var user = new User(req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);

        var dao = new UserDao();
        dao.save(user);
    }
}