import {Request} from 'express';
import {Session} from "hydrate-mongodb";

export interface ExpressRequest extends Request {

    body: any;
    entityManager: Session;
}
