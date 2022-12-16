const ProductModel = require('../../models/product');
const CategoryModel = require('../../models/category');
const qs = require('qs')
const { flash } = require('express-flash-message');

class Product {
    async index(req, res, next) {
        try {
            let products = await ProductModel.find().populate('category');
            res.render('admin/products/list.ejs', {data: products});
        }catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try{
            let categories = await CategoryModel.find();
            res.render('admin/products/add.ejs', {data: categories});
        }catch (e) {
            next(e)
        }

    }

    async store(req, res, next) {
        try {
            await ProductModel.create({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                content: req.body.content,
            })
            await req.flash('error', '');
            res.redirect('/admin/products')
        }catch (e) {
            let messageValidation = {
                name: e.errors['name'].message,
                price: e.errors['price'].message
            }
            console.log(messageValidation)
            await req.flash('error', messageValidation);
            res.redirect('/admin/products/create')
        }
    }
}

module.exports = Product
