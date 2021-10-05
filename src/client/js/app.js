// const { default: fetch } = require("node-fetch");
import { isDateValid } from "./isDateValid";

function updateUI(jsonData) {
    const location = document.getElementById('location-info');
    const weather = document.getElementById("weather-info");
    const data = JSON.parse(jsonData);
    const locationText = `Your trip to ${data['place']}, ${data['country']} 
                          is in ${data['daysToTrip']} days!!`;
    const weatherText = `The weather in ${data['place']}
                            is ${data['temperature']} Degrees
                            with ${data['description']}`;
    location.innerHTML = locationText;
    weather.innerHTML = weatherText;
}

function updateImage(data) {
    const imageId = document.getElementById("image");
    imageId.src = data.image;
    // console.log(data);
    imageId.alt = `Image of ${data.tags}`;
}

const postData = async ( url = '', data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error", error);
    }
}

function getImage(place = "", country = "") {
    postData('/image', {'place': place})
    .then(data => {
        const imageUrl = data.hits[0].largeImageURL;
        const tags = data.hits[0].tags;
        // console.log(imageUrl);
        updateImage({"image":imageUrl, "tags":tags});
    })
    .catch(error => {
        console.log("in Image Error");
        console.log(error.body);
        getImage(country);
    });
}

function handleSubmit(event) {
    event.preventDefault();

    console.log("Submit button pressed");
    const place = document.getElementById("destination").value;
    const startDate = new Date(document.getElementById("start").value);
    // const endDate = new Date(document.getElementById("end").value);
    postData('/weather', {'place': place, 'tripDate': startDate})
    .then(weather => {
        while (!isDateValid(startDate)) {
            alert("Date must be later than today! Please try again.");
            startDate = new Date(document.getElementById("start").value);
        }
        if (weather.success === true) {
            console.log(weather);
            updateUI(JSON.stringify(weather));
            return weather;
        }
        else if (weather.success == false) {
            // alert("The place you entered does not exist! Please try again.");
            console.log(weather);
        }
    })
    .then(weather => {
        // console.log(weather);
        getImage(place, weather['country']);
    })
    .catch(error => {
        console.log(error.message);
    })
};

// function isDateValid(date) {
//     // Check that the date is not in the past
//     const now = Date.now();
//     if ((date - now) >= 0) {
//         return true;
//     }
//     else {
//         return false;
//     }

export {
    handleSubmit
};