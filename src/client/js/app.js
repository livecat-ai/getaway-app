// const { default: fetch } = require("node-fetch");

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
    imageId.src = data;
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

function getImage(place, country) {
    postData('/image', {'place': place})
    .then(data => {
        const imageUrl = data.hits[0].largeImageURL;
        // console.log(imageUlr);
        console.log(imageUrl);
        updateImage(imageUrl);
    })
    .catch(error => {
        console.log("in Image Error");
        console.log(error.body);
        console.log
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
        // console.log(weather);
        updateUI(JSON.stringify(weather));
        // country = data['country'];
        return weather;
    })
    .then(weather => {
        // console.log(weather);
        getImage(place, weather['country']);
    });
};

export {
    handleSubmit
};