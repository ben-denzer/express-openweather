'use strict';

let http = require('http');
let key = require('../../.openWeatherKey').key;

let apiCall = (lat, lng, cb) => {

  let apiCallback = (response) => {
    let str = '';

    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('error', (err) => {
      return cb('Error in weather call', err);
    });

    response.on('end', () => {
      cb(null, str);
    });
  };

  let options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + key
  };
  http.request(options, apiCallback).end();
}

module.exports = apiCall;
