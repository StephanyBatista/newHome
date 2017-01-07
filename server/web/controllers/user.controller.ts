import {User} from '../../model/user';
import {ExpressRequest, ExpressResponse} from "../expressRequest";

export class UserController{

    public async post(req: ExpressRequest, res: ExpressResponse, next) {
        
        if(!req.body.email){

            next(new Error("Email was not informed"));
            return;
        }    

        var user = await req.repository.get(User, { email: req.body.email });

        if (user) {

            next(new Error("User with same e-mail already exists"));
            return;
        }

        try {
            
            user = new User(req.body.name, req.body.email, UserController.tranformToDate(req.body.birthday));
            user.updatePassword(req.body.password);
            await req.repository.save(User, user);
            res.sendResponse(user.id);
        }
        catch(err) {

            return next(err);
        }
    }

    private static tranformToDate(date: string): Date{
        
        var moment = require('moment');
        return moment(date, 'DD/MM/YYYY').toDate();
    }

    public async put(req: ExpressRequest, res: ExpressResponse, next) {

        var user = await req.repository.get(User, { email: req.body.email });

        if (!user) {
            next(new Error("User was not found"));
            return;
        }

        user.birthday = new Date(req.body.birthday);
        user.email = req.body.email;
        user.name = req.body.name;

        res.sendResponse(user.id);
    }
}
