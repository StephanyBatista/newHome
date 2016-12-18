import {injectable} from "inversify";
import {Request, Response} from 'express';
import {User} from '../../model/User';
import {UserDao} from '../../dao/user.dao';
import {UserModel} from '../../dao/user.model';

export class UserController{

    private _userDao: UserDao;
    
    public constructor(){
        
    }

    public post(req, resp, next){
        
        var user = new User(req.body.id, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);

        var dao = new UserDao();
        dao.save(user).then(
            () => {
                resp.json({success: true});
            }, 
            (error) => {
                resp.json({success: false});
            }
        );
    }
}