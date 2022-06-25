const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/loginDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DATABASE CONNECTED');
    })
    .catch(err => {
        console.log(err)
    });

app.listen(3000, () => {
    console.log("SERVER RUNNING AT LOCALHOST:3000")
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'TemporarySecretKey' }));

// * Check if user is logged In or not
const isLogIn = (req,res,next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    }
    next();
}

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    
    req.session.user_id = user._id;
    req.session.username = user.username;
    res.redirect('/welcome');
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.userValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        req.session.username = foundUser.username;
        res.redirect('/welcome');
    } else {
        res.redirect('/login')
        console.log('user not found')
    }
});

app.get('/welcome', (req, res) => {
    const username = req.session.username;
    res.render('welcome', { username });
});

app.get('/secret', isLogIn, (req, res) => {
    res.send('This is TOP secret. You can only see this if you are logged in!!')
})