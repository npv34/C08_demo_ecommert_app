const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/admin/login')
    }

}

module.exports = checkAuth;
