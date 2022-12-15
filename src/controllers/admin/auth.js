class Auth {
    showFormLogin(req, res) {
        console.log(req.flash())
        res.render('admin/login');
    }
}

module.exports = Auth;
