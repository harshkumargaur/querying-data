// require('express-async-errors')
const Product = require('./../models/product.model');
const wrapper = require('./../utils/wrapper')
const error = require('http-errors');
const {StatusCodes,getReasonPhrase} = require('http-status-codes'); 


exports.getAllProductsStatic = wrapper(async (req, res, next) => {
    const products = await Product.find({});
    if (!products) return next(error(404, 'could not get products'))

    return res.status(StatusCodes.OK).json({
        products
    })

})

exports.getAllProducts = wrapper(async (req, res, next) => {

   

    const { featured, company, search, sort, fields, num } = req.query;

    let productsQuery;
    const query = {};

    if (featured) {
        query.featured = featured;
    }
    if (company) {
        query.company = company;
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' }
    }

    productsQuery = Product.find(query);

    if (sort) {
        const sorting = sort.split(',').join(' ');
        productsQuery = productsQuery.sort(sorting);

        // if sorting = price -rating then output will follow 
        // if price is equal then arrange products in descending order
    } else {
        productsQuery = productsQuery.sort('price');

    }

    if (fields) {
        const selected = fields.split(',').join(' ');
        productsQuery = productsQuery.select(selected);

    } else {
        productsQuery = productsQuery.select('name price');

    }

    if (num) {
        const [property, operator, val] = num.split(',');
        // console.log(property, operator, val);
        switch (operator) {
            case '>':

                productsQuery = productsQuery.where(property).gt(val);
                break;
            case '>=':

                productsQuery = productsQuery.where(property).gte(val);
                break;
            case '<':

                productsQuery = productsQuery.where(property).lt(val);
                break;
            case '<=':

                productsQuery = productsQuery.where(property).lte(val);
                break;
            case '>':

                productsQuery = productsQuery.where(property).gte(val);
                break;

            default:
                break;
        }

    }

   

    const page = Number(req.query.page) || 1;
    const docLimit = Number(req.query.limit) || 5;
    const skiped = (page - 1) * 5;




    const products = await productsQuery.skip(skiped).limit(docLimit);
    if (!products) return next(error(StatusCodes.NOT_FOUND,getReasonPhrase(StatusCodes.NOT_FOUND)))
    if(products.length === 0) return(next(error(StatusCodes.BAD_REQUEST,getReasonPhrase(StatusCodes.BAD_REQUEST))))
    return res.status(StatusCodes.OK).json({
        products
    })

})




