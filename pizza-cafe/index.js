const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.listen(3000, () => {
    console.log("Server is running at localhost:3000")
})

// * Importing Models
const Pizza = require('./models/products');
const Order = require('./models/orders')

// * Connecting to Database
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// * Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const pizzaSize = ['small', 'medium', 'large', 'x large'];

// * Home page
app.get('/', async (req, res) => {
    const pizzaTypes = await Pizza.find({});
    res.render('products/index', { pizzaTypes });
});

// * Orders Page
app.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    res.render('products/orders', { orders })
})

// * Placing Order
app.get('/order/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Pizza.findById(id);
    await Order.create({
        pizzaName: product.pizzaName,
        price: product.price,
        size: product.size
    });
    res.render('products/orderComplete', { product });
})

// * Create New Pizza Page
app.get('/new', (req, res) => {
    res.render('products/new', { pizzaSize })
})

// * Cancelling Order
app.delete('/orders/cancel/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await Order.findByIdAndDelete(id);
    res.redirect(`/orders/cancel/${id}`)
})

// * Order Cancelled Page
app.get('/orders/cancel/:id', async (req, res) => {
    res.render('products/orderCancelled')
})

// * Edit Order Page
app.get('/orders/:id/edit', async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.render('products/edit', { order, pizzaSize })
})

// * Editing Order
app.put('/orders/edit/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/orders`);
})


