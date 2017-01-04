import {Request, Response} from 'express';

export class AdminController{

    public newUser(req: Request, resp: Response, next: any){

        resp.render("admin/user/create");
    }
    
    public get(req: Request, resp: Response, next: any){

        resp.render("admin/index");
    }
}