import {Session, Constructor} from "hydrate-mongodb";

export class Repository{

    readonly session: Session;
    
    constructor(session: Session){

        this.session = session;
    }

    public async get<T>(ctr: Constructor<T>, query: Object){

        return await this.session.query(ctr).findOne(query).asPromise();
    }

    public async save<T>(ctr: Constructor<T>, entity: T){

        return new Promise((resolve, reject) => {

            this.session.save(entity, (err) => {
                if(err) reject(err);
                resolve();
            });
        });
    }
}