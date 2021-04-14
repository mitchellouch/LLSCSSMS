//functions for interpreting incoming requests before moving to the route handler

//check user logged in - Jin
exports.requireLogin = (req, res, next) => {
    if(req.session && req.session.user){
        return next();
    }
    else {
        return res.redirect("/login");
    }
}

exports.requireAdmin = (req, res, next) => {
    if(req.session && req.session.user && req.session.user.admin == true){
        return next();
    }
    else {
        return res.redirect("/");
    }
}