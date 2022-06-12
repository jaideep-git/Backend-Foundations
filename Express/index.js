const express = require("express");
const app = express();

// * Listening to the server
app.listen(3000, () => {
    console.log("SERVER is running at localhost:3000");
})

app.get('/', (req,res) => {
    res.send('Welcome to Home Page')
})

// * Params 
app.get( '/social/:instagran/:postId', (req,res) => {
    res.send(req.params)
});

// * Query String
app.get('/search', (req, res) => {
    const {q} = req.query;
    console.log(`${q}`);
});

// * Universal Path
app.get('*', (req, res) => {
    res.send(`I don't know that path!`);
});


