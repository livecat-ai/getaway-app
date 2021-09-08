// import dotenv to access local .env variables
require('dotenv').config();

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

// app.get('/', function (req, res) {
//     console.log('in root');
//     res.send("hello world");
// });

let appData = [];

app.get('/', function (req, rest) {
    res.sendFile('dist/index.html')
})

app.post('/weather', function (req, res) {
    const tripDate = new Date(req.body.tripDate);
    const info = {};

    info.place = req.body.place;
    info.daysToTrip = daysToTrip(tripDate);
    info.tripDate = tripDate.getTime();

    console.log(`requesting gps coords for: ${info.place}`);
    getGpsFromPlaceName(info.place)
    .then(data => {
        info.lat = data.geonames[0].lat;
        info.lon = data.geonames[0].lng;
        info.country = data.geonames[0].countryName;
        // console.log(info);
        return getForcastWeather(info.lat, info.lon)
    })
    .then(data => {
        info.temperature = data.data[0].temp;
        info.description = data.data[0].weather.description;
        // appData.push(info);
        console.log(info);
        res.send(info);
    })
});

app.post('/image', function (req, res) {
    const place = req.body.place;
    getImageFromPlaceName(place)
    .then(data => {
        console.log(data);
        res.send(data);
    })
})

const getData = async(url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

function gpsFromPlacenameUrl(placeName) {
    // Use Geonames to get gps coords for a given a
    // place name and a country code
    const username = process.env.GEONAMES_USER;
    const baseUrl = "http://api.geonames.org/searchJSON?";
    const placeUrl = "q=" + placeName;
    const userUrl = "&username=" + username;
    return baseUrl + placeUrl + userUrl;
}

function getGpsFromPlaceName(placeName) {
    const url = gpsFromPlacenameUrl(placeName);
    return getData(url);
}

function forcastWeatherUrl(lat, lon) {
    const api_key = process.env.WEATHERBIT_KEY;
    const baseUrl = "https://api.weatherbit.io/v2.0/current";
    return `${baseUrl}?lat=${lat}&lon=${lon}&key=${api_key}`;
}

function getForcastWeather(lat, lon) {
    const url = forcastWeatherUrl(lat, lon);
    return getData(url);
}

function imageFromPlaceNameUrl(placeName) {
    const apiKey = process.env.PIXABAY_KEY;
    const baseUrl = "https://pixabay.com/api/";
    return `${baseUrl}?key=${apiKey}&q=${placeName}&image_type=photo`;
}

function getImageFromPlaceName(placeName) {
    const url = imageFromPlaceNameUrl(placeName);
    return getData(url);
}

const getAverageWeather = async (lat, lon, startDate, endDate) => {
    const api_key = process.env.WEATHERBIT_KEY;
    const baseUrl = "https://api.weatherbit.io/v2.0/normals";
    const searchUrl = `${baseUrl}?lat=${lat}&lon=${lon}`
                     + `&start_day=${startDate}`
                     + `&end_day=${endDate}&tp=monthly&key=${api_key}`;
    console.log(`fetching: ${searchUrl}`);
    const res = await fetch(searchUrl);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

function dateToWeatherbitFormat(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getMonth()}-${date.getDate()}`;
}

function daysToTrip(tripDate) {
    const now = new Date(Date.now());
    const days = dateDeltaInDays(now, tripDate);
    console.log(days);
    return days;
}

function dateDeltaInDays(startDate, endDate) {
    const delta = endDate.getTime() - startDate.getTime();
    const minutes = Math.floor(delta / 60000);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    return days
};