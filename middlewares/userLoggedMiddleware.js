const User = require('../models/User');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);
    
    if(userFromCookie) {
        req.session.userLoged = userFromCookie;
    }
    
    
    if (req.session && req.session.userLoged) {
        res.locals.isLogged = true;
        res.locals.userLoged = req.session.userLoged;
    };


    next();

};

module.exports = userLoggedMiddleware;