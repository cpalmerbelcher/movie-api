const express = require('express');
const app = express();

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
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(movies);
  });

  app.use('/movies', express.static('public'));
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });