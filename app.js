const path = require('path');
const express= require('express');
const app = express();
const morgan = require('morgan');
const productRouter = require('./routes/product.router');

const error = require('http-errors');
const {statusCodes,getReasonPhrase, StatusCodes} = require('http-status-codes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/v1/products',productRouter);

app.all('*',(req,res,next)=>{
    return next(error(StatusCodes.NOT_FOUND,'path does not exists'))
    // throw new error(404,'path doesnot exists')
})

app.use((err,req,res,next)=>{
    if (err.statusCode) {
        res.status(err.statusCode).json({
            err
        })
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err
        })
    }
})

module.exports=app;

