import {Request, Response} from 'express';
import {Session} from "hydrate-mongodb";

export interface ExpressRequest extends Request {

    body: any;
    entityManager: Session;
}

export interface ExpressResponse extends Response {

    sendResponse(value?: any): void;
}
