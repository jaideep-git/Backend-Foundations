const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
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

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;
