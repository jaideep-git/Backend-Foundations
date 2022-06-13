const express = require("express");
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid'); // getting unique id
const methodOverride = require('method-override');

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public') ));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// fake database
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
// * Listening to the server
app.listen(3000, () => {
    console.log("SERVER is running at localhost:3000");
})

app.get('/', (req,res) => {
    res.render('subway')
})

app.post('/orderComplete', (req, res) => {
    const order = req.body;
    res.render(`orderComplete`, { order })
})

// * All Comments Page
app.get('/comments', (req,res) => {
    res.render('comments/index', { comments })
})

// * Add new comment page
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// * post new comment
app.post('/comments', (req,res) => {
     const {username, comment} = req.body;
     comments.push({id:uuid(),username,comment}); 
     res.redirect('/comments')
})

// * Show comment in details
app.get('/comments/details/:id', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/details', { comment })
})

// * Go to Edit page
app.get('/comments/:id/edit' , (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

// * Edit Comments
app.patch('/comments/:id' , (req,res) => {
    const { id } = req.params;
    const editedComment = req.body.comment;
    const matchedComment = comments.find(c => c.id === id);
    matchedComment.comment = editedComment;
    res.redirect('/comments');
});

// * Delete Comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})


 


 