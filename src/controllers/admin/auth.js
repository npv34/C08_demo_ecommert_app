class Auth {
    showFormLogin(req, res) {
        let error = req.flash('message');
        console.log(error)
        res.render('admin/login', {error: error});
    }
}

module.exports = Auth;
