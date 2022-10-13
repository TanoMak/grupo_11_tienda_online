function userLoggedMiddleware (req, res, next){
    let isLogged = false;
    req.locals.isLogged = false;

    next();

};

module.exports = userLoggedMiddleware;