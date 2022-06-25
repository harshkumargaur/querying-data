require('dotenv').config();
const mongoose= require('mongoose');
const Product = require('./../models/product.model');
const product = require('./products.json');

const populate = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(product);
        console.log('done');
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
}

populate();