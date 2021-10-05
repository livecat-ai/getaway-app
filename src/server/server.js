// import dotenv to access local .env variables
require('dotenv').config();
const dateUtils = require('./dateUtils');

// import { daysToTrip } from './dateUtils';

// Import fetch
const fetch = require('node-fetch');

// Run the express server
const express = require('express');
const app = express();
// Assign the server port
const port = 3000;

// // Start up bodyParser
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start up Cors
const cors = require('cors');
app.use(cors());

// // Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// let appData = [];

app.get('/', function (req, rest) {
    res.sendFile('dist/index.html')
})

app.post('/weather', function (req, res) {
    const tripDate = new Date(req.body.tripDate);
    const info = {};

    info.place = req.body.place;
    info.daysToTrip = dateUtils.daysToTrip(tripDate);
    info.tripDate = tripDate.getTime();

    console.log(`requesting gps coords for: ${info.place}`);
    getGpsFromPlaceName(info.place)
    .then(data => {
        try {
            info.lat = data.geonames[0].lat;
            info.lon = data.geonames[0].lng;
            info.country = data.geonames[0].countryName;
            // console.log(info);
            if (info.daysToTrip <= 7) {
                return getCurrentWeather(info.lat, info.lon);
            }
            else {
                return getForcastWeather(info.lat, info.lon);
                // return getCurrentWeather(info.lat, info.lon);
            }
            
        }
        catch(error) {
            console.log(error);
        }
    })
    .then(data => {
        try {
            info.temperature = data.data[0].temp;
            info.description = data.data[0].weather.description;
            // appData.push(info);
            // console.log(info);
            info.success = true;
            res.send(info);
        }
        catch(error) {
            console.log(error);
            res.send({"success":false, "message": "place not found"});
        }
    })
});

app.post('/image', function (req, res) {
    const place = req.body.place;
    getImageFromPlaceName(place)
    .then(data => {
        // console.log(data);
        res.send(data);
    })
})

const getData = async(url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    }
    catch(error) {
        console.log("In Server Error");
        console.log("error", error);
    }
}


// ####################################
// Get GPS data
// ####################################
function gpsFromPlacenameUrl(placeName) {
    // Use Geonames to get gps coords for a given a
    // place name and a country code
    // const username = process.env.GEONAMES_USER;
    const username = "livecat";
    const baseUrl = "http://api.geonames.org/searchJSON?";
    const placeUrl = "q=" + placeName;
    const userUrl = "&username=" + username;
    return baseUrl + placeUrl + userUrl;
}

function getGpsFromPlaceName(placeName) {
    const url = gpsFromPlacenameUrl(placeName);
    return getData(url);
}

// ############################################
// Get the current weather at a given GPS coord
// ############################################
function currentWeatherUrl(lat, lon) {
    // const api_key = process.env.WEATHERBIT_KEY;
    const api_key = "c80fa9cb65a6496da87b7ddf658498d3";
    const baseUrl = "https://api.weatherbit.io/v2.0/current";
    return `${baseUrl}?lat=${lat}&lon=${lon}&key=${api_key}`;
}

function getCurrentWeather(lat, lon) {
    const url = currentWeatherUrl(lat, lon);
    return getData(url);
}

// ############################################
// Get an image of a location given a placename
// ############################################
function imageFromPlaceNameUrl(placeName) {
    // const apiKey = process.env.PIXABAY_KEY;
    const apiKey = "23143916-7f349d523619fd3a0d4aaccb2";
    const baseUrl = "https://pixabay.com/api/";
    return `${baseUrl}?key=${apiKey}&q=${placeName}&image_type=photo`;
}

function getImageFromPlaceName(placeName) {
    const url = imageFromPlaceNameUrl(placeName);
    return getData(url);
}

// ############################################
// Get the forcast weather at a given GPS coord
// ############################################
function getForcastWeather(lat, lon) {
    const apiKey = process.env.WEATHERBIT_KEY;
    const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily"
    const searchUrl = `${baseUrl}?lat=${lat}&lon=${lon}&key=${apiKey}`
    return getData(searchUrl);
}


function dateToWeatherbitFormat(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getMonth()}-${date.getDate()}`;
}

// function daysToTrip(tripDate) {
//     const now = new Date(Date.now());
//     const days = dateDeltaInDays(now, tripDate);
//     console.log(days);
//     return days;
// };

function dateDeltaInDays(startDate, endDate) {
    const delta = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(delta / 60000);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24)+1;
    return days
};

