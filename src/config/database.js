const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommert').catch(err => {
    console.log('error database connection')
});

module.exports = mongoose;
