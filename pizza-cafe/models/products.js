const mongoose = require('mongoose');
const { Schema } = mongoose;

const pizzaShopSchema = new Schema({
    pizzaName: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: String,
        lowercase: true,
        enum: ['small', 'medium', 'large', 'x large']
    }
    
})

const Pizza = mongoose.model('Pizza', pizzaShopSchema);

module.exports = Pizza;
