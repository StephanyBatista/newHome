export class ErrorsHandler{

    public generic(err, req, res, next){
        
        if (!err) {
            return next();
        }

        res.status(500);
        res.send('500: Internal server error');
    }
}
