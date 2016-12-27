import {Request, Response} from 'express';
import {User} from '../../model/User';
import {UserDao} from '../../dao/user.dao';
import {UserSchemaGenerator} from '../../dao/user.model';
import Injector from '../../cross/injector';

export class UserController{

    public async post(req, resp, next){
        
        if(!req.body.email)
        {
            resp.json({success: false, error: "Email was not informed"});
            return;
        }    
        
        var userDao = <UserDao>Injector.getRegistered("userDao");
        var userSaved = await userDao.getByEmail(req.body.email);
        
        if(userSaved)
        {
            resp.json({success: false, error: "User with same e-mail already exists"});
            return;
        }    

        try{
            var user = new User(null, req.body.name, req.body.email, req.body.birthday);
            user.updatePassword(req.body.password);    

            await userDao.save(user);
            resp.json({success: true});

        }catch(error){
            next(error);
        }
    }

    public async put(req, resp, next){
        
        var userDao = <UserDao>Injector.getRegistered("userDao");

        var userSaved = await userDao.getByEmail(req.body.email);
        if(!userSaved)
            resp.json({success: false, error: "User was not found"});
            
        else{
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
}
