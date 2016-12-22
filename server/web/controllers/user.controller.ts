import {Request, Response} from 'express';
import {User} from '../../model/User';
import {UserDao} from '../../dao/user.dao';
import {UserSchemaGenerator} from '../../dao/user.model';
import Injector from '../../cross/injector';

export class UserController{

    public post(req, resp, next){
        
        var userDao = <UserDao>Injector.getRegistered("userDao");
        userDao.getByEmail(req.body.email).then((userSaved) => {
            if(userSaved)
                resp.json({success: false, error: "User with same e-mail already exists"});
            else    
                return UserController.saveUser(req, resp, userDao);
        }).catch((error) => {
            resp.json({success: false, error: error});
        });
    }

    static saveUser(req: any, resp: any, userDao: UserDao){
        
        var user = new User(null, req.body.name, req.body.email, req.body.birthday);
        user.updatePassword(req.body.password);

        userDao.save(user).then(
            () => {
                resp.json({success: true});
            }, 
            (error) => {
                resp.json({success: false, error: error});
            }
        );
    }

    public put(req, resp, next){
        
        var userDao = <UserDao>Injector.getRegistered("userDao");
        userDao.getByEmail(req.body.email).then((userSaved) => {
            if(!userSaved)
                resp.json({success: false, error: "User was not found"});
            else
                UserController.updateUser(req, resp, userDao);
        });
    }

    static updateUser(req: any, resp: any, userDao: UserDao){
        
        var user = new User(null, req.body.name, req.body.email, req.body.birthday);
        userDao.update(user).then(
            () => {
                resp.json({success: true});
            },
            (error) => {
                resp.json({success: false, error: error});
            }
        );
    }
}
