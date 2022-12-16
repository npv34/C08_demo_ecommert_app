const mongoose = require('../config/database')
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'Name is required'],
        minLength: [2, 'Minimum length is 2']
    },
    description: String,
    content: String,
    price: {
        type: 'number', required: true
    },
    image: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
