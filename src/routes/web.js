const express = require('express');
const DashboardController = require('../controllers/admin/dashboard')
const ProductController = require('../controllers/admin/product')
const AuthController = require('../controllers/admin/auth')
const multer  = require('multer')
const passport = require("../middlewares/auth");
const checkAuth = require("../middlewares/checkAuth");
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

const dashboardController = new DashboardController();
const productController = new ProductController();
const authController = new AuthController();

router.get('/admin/login', authController.showFormLogin)
router.post('/admin/login', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash : true
}));

router.use(checkAuth)

router.get('/admin/dashboard', dashboardController.index)
router.get('/admin/products', productController.index);
router.get('/admin/products/create', productController.create);
router.post('/admin/products/create', upload.none(), productController.store);

router.get('*', (req, res) => {
    res.render('admin/errors/404.ejs')
})

module.exports = router;
