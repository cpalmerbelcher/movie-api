const express = require('express'),
   
const app = express();
app.use(express.json());
const morgan = require('morgan');

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);
app.use(morgan('common'));

let movies = [
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
    {
      title: 'movie name',
      director: 'name'
    },
  ];

  // Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to my movie database!');
});
  
  // GET requests for movies
  app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ', err);
    });
  });


  // GET a list of all movies
  app.get('/movies', passport.authenticate('jwt', {session: false}), (req.res) => {
    movies.find()
    .then((movies) =>{
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ', err);
    });
  });

  app.use('/movies', express.static('public'));
  
  // GET requests for all users
  app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ', err);
    });
  });

  // Add a new user
  app.post('/users', [
    check('Name', 'Username is required').isLength({min: 5}),
    check('Name', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Mail', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: erros.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Name: req.body.Name})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Users.create({
          Name: req.body.Name,
          Password: hashedPassword,
          Mail: req.body.Mail,
          Birthday: req.body.Birthday
        }).then((user) => {res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.satus(500).send('Error: ' + error);
    });
  });

  // Update user info by username
  app.put('/users/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({Name: req.params.Name}, {
      $set:
      {
        Name: req.body.Name,
        Password: req.body.Password,
        Mail: req.body.Mail,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

  // Delete a user by their username
  app.delete('/users/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndRemove({Name: req.params.Name})
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.Name + ' was not found.');
      } else {
        res.status(200).send(req.params.Name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  // Add a movie to the favorite list of an user
  app.post('/users/:Name/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({Name: req.params.Name}, {
      $push: {FavoriteMovies: req.params.MovieID}
    },
    {new: true},
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

  // Delete a movie from the favorite list of an user
app.delete('/users/:Name/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({Name: req.params.Name}, {
    $pull: {FavoriteMovies: req.params.MovieID}
  },
  {new: true},
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

  // Error handler
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong. Please try again.');
  });

  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });