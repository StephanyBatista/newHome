import {Request, Response} from 'express';

export class AdminController{

    public get(req: Request, resp: Response, next: any){

        resp.render("admin/index");
    }
}