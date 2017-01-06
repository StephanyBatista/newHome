export class ErrorsHandler{

    public generic(err, req, res, next){
        
        if (!err)
            return next();
        //TODO: Improve this code because the tests are receive a json
        // if(!req.xhr){
        //     var view = req.url.substring(1);
        //     res.render(view, {errors: err.message});
        // }    
        // else
            res.status(500).json({success: false, error: err.message});
    }
}
