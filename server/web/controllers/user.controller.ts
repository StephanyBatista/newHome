import {User} from '../../model/user';
import {ExpressRequest} from "../expressRequest";

export class UserController{

    public async post(req: ExpressRequest, resp, next){
        
        if(!req.body.email)
        {
            resp.json({success: false, error: "Email was not informed"});
            return;
        }    
        
        req.entityManager.query(User).findOne({ email: req.body.email }, (err, user: User) => {
            if (err) return next(err);

            if (user) {
                resp.json({success: false, error: "User with same e-mail already exists"});
                return;
            }

            // todo: need to fix this to correctly parse date and take timezone into account OR store date as string
            try {
                user = new User(req.body.name, req.body.email, new Date(req.body.birthday));
                user.updatePassword(req.body.password);
            }
            catch(err) {
                return next(err);
            }

            req.entityManager.save(user);
            req.entityManager.close((err) => {
                if (err) return next(err);

                resp.json({success: true});
            });
        });
    }

    public async put(req: ExpressRequest, resp, next){

        req.entityManager.query(User).findOne({ email: req.body.email }, (err, user: User) => {
            if (err) return next(err);

            if (!user) {
                resp.json({success: false, error: "User was not found"});
                return;
            }

            // todo: need to fix this to correctly parse date and take timezone into account OR store date as string
            user.birthday = new Date(req.body.birthday);
            user.email = req.body.email;
            user.name = req.body.name;

            user.updatePassword(req.body.password);

            // you do not need to call session.save - dirty checking is automatic with the default change tracking

            req.entityManager.close((err) => {
                if (err) return next(err);

                resp.json({success: true});
            });
        });
    }
}
