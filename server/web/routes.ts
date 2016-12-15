import {Application, Router} from 'express';

export class Routes{

    readonly app: Application;
    readonly router: Router;
    
    constructor(router: Router){
        
        this.router = router;
        this.Configure();
    }   

    private Configure(){
        
        this.router.post('/api/v1/user', (req, res) => {});
    }

    public Apply(app: Application){
        
        this.app.use('/', this.router);
    }
}