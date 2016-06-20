'use strict'
$(function() {
  if (navigator.geolocation) {
    var geoSuccess = function(position) {
      var geoLat = Math.round(position.coords.latitude);
      var geoLon = Math.round(position.coords.longitude);
      $.getJSON('/projects/weather/api/' + geoLat + '/' + geoLon, function(data) {
        var measurement;
        data.sys.country === 'US' ? measurement = 'imperial' : measurement = 'metric';
        update(data.name, data.main.temp, data.weather[0].main, data.weather[0].icon, data.main.humidity, data.wind.speed, data.wind.deg, measurement);
      });
    };

    var geoError = function(error) {
    	alert('We Couldn\'t determine your location');
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }
  else {
  	alert('There was an error trying to get your location');
  }
});

function update(city, kelvin, sky, icon, humidity, windMps, windDir, measurement) {

  if (!city || !kelvin) {
    alert("Something went wrong, please try again later");
  }

  switch (true) {
    case (parseInt(toFarenheit(kelvin)) <= 40):
      $('body').css('background-image', 'url(images/cold.jpg)');
      break;
    case (parseInt(toFarenheit(kelvin)) > 40 && parseInt(toFarenheit(kelvin)) <= 90):
      $('body').css('background-image', 'url(images/mild.jpg)');
      break;
    case (parseInt(toFarenheit(kelvin)) > 90):
      $('body').css('background-image', 'url(images/hot.jpg)');
      break;
  }

  if (measurement === 'imperial') {
    var temp = toFarenheit(kelvin);
    var wind = toMph(windMps) + 'MPH';
    $('#toggleUnits').text('Switch to metric measurements');
  }
  else {
    var temp = toCelcius(kelvin);
    var wind = Math.round(windMps) + 'M/S';
    $('#toggleUnits').text('Switch to imperial measurements');
  }

  $('#city').text(city);
  $('#tempCircle').html('<img class="icon" src="http://openweathermap.org/img/w/' + icon + '.png" height="100" width="100"><br><span class="smallTxt">' + sky + '</span><br>' + temp);
  $('#humidity').text(Math.round(humidity) + '%');
  $('#wind').text(direction(windDir) + ' - ' + wind);

  $('#toggleUnits').click(function() {
    if (measurement === 'imperial') {
      measurement = 'metric';
      $(this).text('Switch to imperial measurements');
    }
    else {
      measurement = 'imperial';
      $(this).text('Switch to metric measurements');
    }
    update(city, kelvin, sky, icon, humidity, windMps, windDir, measurement);
  });
}

function toFarenheit(kelvin) {
  return Math.round(kelvin * (9/5) - 459.67) + '&deg;F';
}

function toCelcius(kelvin) {
  return Math.round(kelvin - 273.15) + '&deg;C';
}

function toMph(Mps) {
  return Math.round(Mps * 2.237);
}

function direction(windDir) {
  var temp = Math.round(windDir / 22.5);
  switch(temp) {
    case 16:
      return 'N';
    case 0:
      return 'N';
    case 1:
      return 'NNE';
    case 2:
      return 'NE';
    case 3:
      return 'ENE';
    case 4:
      return 'E';
    case 5:
      return 'ESE';
    case 6:
      return 'SE';
    case 7:
     return 'SSE'
    case 8:
      return 'S';
    case 9:
      return 'SSW';
    case 10:
      return 'SW';
    case 11:
      return 'WSW';
    case 12:
      return 'W';
    case 13:
      return 'WNW';
    case 14:
      return 'NW';
    case 15:
      return 'NNW';
  }
}
