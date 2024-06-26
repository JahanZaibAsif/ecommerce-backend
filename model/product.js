const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce');
const productSchema = new mongoose.Schema({
    product_name:{
        type:String
    },
    product_picture:{
        type:String
    },
    product_detail:{
        type:String
    },
    product_price:{
        type:Number
    }
});

const Product = mongoose.model('product',productSchema);

module.exports = Product;