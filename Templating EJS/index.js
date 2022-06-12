const express = require("express");
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public') ));

// * Listening to the server
app.listen(3000, () => {
    console.log("SERVER is running at localhost:3000");
})

// * Setting up the templating engine for the sever
app.set('view engine', 'ejs');

// * changing views directory from Default ( process.cwd() ) 
app.set('views', path.join(__dirname, '/views') )

app.get('/', (req,res) => {
    res.render('home');
})

// * Passing Data through Templates
app.get('/random', (req,res) => {
    const num = Math.floor(Math.random() * 10) + 1
    res.render('random', { num });
})

// * Passing params 
app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];

    if(!data){
        res.send('Not Found')
    }
    res.render('subreddit', { ...data });
})

app.get('/dogs', (req,res) => {
    const favDogs = ['Rusty', 'Happy', 'JJ'];
    res.render('dogs', { favDogs });
})






 