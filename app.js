'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let app = express();
let path = require('path');
let port = process.env.PORT || 8081;
let urlParser = bodyParser.urlencoded({extended: true});
let getWeather = require('./src/services/openWeather');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/api/:lat/:lng', (req, res) => {
  getWeather(req.params.lat, req.params.lng, (err, data) => {
    if (err) {
      res.status(500).send('Error');
    }
    res.status(200).send(data);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error starting express server', err);
  }
  console.log('Listening on port', port);
});
