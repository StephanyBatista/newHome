import {User} from '../../model/user';
import {ExpressRequest, ExpressResponse} from "../expressRequest";

export class UserController{

    public async post(req: ExpressRequest, res: ExpressResponse, next) {
        
        if(!req.body.email)
        {
            next(new Error("Email was not informed"));
            return;
        }    

        // todo: this is not an atomic operation. race condition exists.
        req.entityManager.query(User).findOne({ email: req.body.email }, (err, user: User) => {
            if (err) return next(err);

            if (user) {
                next(new Error("User with same e-mail already exists"));
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

            req.entityManager.save(user, (err) => {
                if (err) return next(err);

                res.sendResponse(user.id);
            });
        });
    }

    public async put(req: ExpressRequest, res: ExpressResponse, next) {

        req.entityManager.query(User).findOne({ email: req.body.email }, (err, user: User) => {
            if (err) return next(err);

            if (!user) {
                next(new Error("User was not found"));
                return;
            }

            // todo: need to fix this to correctly parse date and take timezone into account OR store date as string
            user.birthday = new Date(req.body.birthday);
            user.email = req.body.email;
            user.name = req.body.name;

            user.updatePassword(req.body.password);

            // you do not need to call session.save - dirty checking is automatic with the default change tracking
            res.sendResponse(user.id);
        });
    }
}
