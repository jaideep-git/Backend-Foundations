const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieDb')
    .then( () => {
        console.log("Connection successfull");
    })
    .catch(err => {
        console.log("Connection Error");
        console.log(err)
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    language: String,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

const harryPotter = new Movie({
    title: "Harry Potter", 
    year:2016,
    language: "English",
    rating: "9.8"
});

Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])

// Movie.findOne().then(data => console.log(data));

/* Movie.updateOne({title: 'Harry Potter'}, {year: 2021})
.then( res => console.log(res));
*/



 


  