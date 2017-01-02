export class ErrorsHandler{

    public generic(err, req, res, next){
        
        if (!err)
            return next();
        
            

        res.status(500).json({success: false, error: err.message});
    }
}
