import {Session, Constructor} from "hydrate-mongodb";

export class Repository<T>{

    readonly session: Session;
    
    constructor(session: Session){

        this.session = session;
    }

    public async get<T>(ctr: Constructor<T>, query: Object): Promise<T>{

        return await this.session.query(ctr).findOne(query).asPromise();
    }
}