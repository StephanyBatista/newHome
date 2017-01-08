import {ExpressRequest, ExpressResponse} from '../expressRequest';
import {User} from '../../model/user';

export class AdminController{

    public newUser(req: ExpressRequest, resp: ExpressResponse, next: any){

        resp.render("admin/user/create");
    }

    public async updateUser(req: ExpressRequest, resp: ExpressResponse, next: any){

        var email = req.param('email');
        var entity = await req.repository.get(User, {email: email});
        
        if(entity)
            resp.render("admin/user/update", {entity: entity});
        else
            resp.redirect("/admin/user/list");
    }

    public async listUser(req: ExpressRequest, resp: ExpressResponse, next: any){

        var entities = await req.repository.all(User);
        
        resp.render("admin/user/list", {entities: entities});
    }
    
    public get(req: ExpressRequest, resp: ExpressResponse, next: any){

        resp.render("admin/index");
    }
}