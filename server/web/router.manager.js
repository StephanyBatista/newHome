"use strict";
var passport = require('passport');
class RouterManager {
    constructor(router, adminController, userController) {
        this.router = router;
        router.get('/login', (req, res, next) => {
            if (req.query.fail)
                res.render('login', { error: 'Usuário não encontrado' });
            else
                res.render('login');
        });
        router.post('/login', passport.authenticate('local', {
            successRedirect: '/admin/',
            failureRedirect: '/login?fail=true'
        }));
        //protected resources
        this.router.all("*", (req, res, next) => {
            if (req.isAuthenticated()) {
                next();
            }
            else {
                res.redirect("/login");
            }
        });
        this.router.get('/admin/user/create', adminController.newUser);
        this.router.get('/admin/user/list', adminController.listUser);
        this.router.get('/admin/user/update/:email', adminController.updateUser);
        this.router.get('/admin/', adminController.get);
        this.router.post('/api/v1/user', userController.post);
        this.router.put('/api/v1/user', userController.put);
    }
}
exports.RouterManager = RouterManager;
