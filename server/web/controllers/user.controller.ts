import {Request, Response} from 'express';
import {User} from '../../model/User';
import {UserDao} from '../../dao/user.dao';
import {UserSchemaGenerator} from '../../dao/user.model';

export class UserController{

    private _userDao: UserDao;
    
    public constructor(userDao: UserDao){
        this._userDao = userDao;
    }

    public post(req, resp, next){
        
        var user = new User(req.body.id, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);

        this._userDao.save(user).then(
            () => {
                resp.json({success: true});
            }, 
            (error) => {
                resp.json({success: false});
            }
        );
    }
}