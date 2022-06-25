const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name']
    },
    price: {
        type: Number,
        required: [true, 'A product must have a Price']
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'marcos', 'caressa'],
            message: '{VALUE} is not supported'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        default: 4.5
    },
    featured: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Product', productSchema);