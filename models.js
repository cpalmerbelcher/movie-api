//require mongoose
const mongoose = require('mongoose');

//creating movieSchema
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

//creating user schema
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//adding hashPassword function for hashing submitted password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//adding validatePassword for comparing submitted hashed password with the hashed password in database
/*!!! DO NOT USE ARROW FUNCTION FOR DEFINING INSTANCE METHODS, e.g: validatePassword !!!*/
userSchema. methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//creating genre schema
let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
})

//creating director schema
let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birthdate: {type: Date, required: true},
    Death: {type: String},
    Films: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
})

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

//export models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;

