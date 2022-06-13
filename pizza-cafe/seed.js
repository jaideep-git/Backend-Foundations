const mongoose = require('mongoose');
const Pizza = require('./models/products');

const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/pizzaShop')
}

connectDb()
    .then(() => {
        console.log('Connection Successful');
    })
    .catch(err => {
        console.log(err);
    })


const seedPizzaItems = [
    {
        pizzaName: 'Spicy BBQ Chicken',
        price: 19.00,
        size: 'large'
    },
    {
        pizzaName: 'Tropical Hawaiian',
        price: 11.00,
        size: 'medium'
    },
    {
        pizzaName: 'Garden Veggie',
        price: 7.99,
        size: 'small'
    },
    {
        pizzaName: 'pepperoni',
        price: 15.99,
        size: 'x large'
    },
    {
        pizzaName: 'Supreme Pizza',
        price: 17.99,
        size: 'medium'
    },
]

Pizza.insertMany(seedPizzaItems)
    .then(res => {
        console.log(res);
    })
    .catch (err => {
        console.log(err);
    })