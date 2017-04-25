import {Request, Response} from 'express';
import {Session} from "hydrate-mongodb";
import {Repository} from '../../server/infra/repository';

export interface ExpressRequest extends Request {

    body: any;
    entityManager: Session;
    repository: Repository;
}

export interface ExpressResponse extends Response {

    sendResponse(value?: any): void;
}
