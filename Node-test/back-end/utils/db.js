const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/maoyan', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const Users = mongoose.model('users', {
    username: String,
    password: String
})

const Cinemas = mongoose.model('cinema', {
    cinemaName: String,
    cinemaLocation: String,
    cinemaPhone: Number,
    cinemaServe1: String,
    cinemaServe2: String,
    cinemaServe3: String,
})
const MovieHot = mongoose.model('movieHot', {
    movieId: String,
    movieName: String,
    movieSynopsis: String,
    movieScore: String,
    movieWatch: String,
    movieStra: String,
    movieTime: String,
    movieNumber: String,
    movieImg:String,
})
const MovieUpcoming = mongoose.model('movieUpcoming', {
    movieId: String,
    movieName: String,
    movieSynopsis: String,
    movieScore: String,
    movieWatch: String,
    movieStra: String,
    movieTime: String,
    movieNumber: String,
    movieImg:String,
})

module.exports = {
    Users,
   Cinemas,
   MovieHot,
   MovieUpcoming
}