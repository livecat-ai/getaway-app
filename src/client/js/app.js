// const { default: fetch } = require("node-fetch");

function updateUI(data) {
    const weather = document.getElementById("weather");
    weather.innerHTML = data;
}

function updateImage(data) {
    const imageId = document.getElementById("image");
    imageId.src = data;
}

const postData = async ( url = '', data = {}) => {
    console.log(data);
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

// function dateDelta(startDate, endDate) {
//     const delta = endDate.getTime() - startDate.getTime();
//     const minutes = Math.floor(delta / 60000);
//     const hours = Math.round(minutes / 60);
//     const days = Math.round(hours / 24);
//     return days
// };

// function dateToWeatherbitFormat(date) {
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     return `${date.getMonth()}-${date.getDate()}`;
// }


function handleSubmit(event) {
    event.preventDefault();

    console.log("Submit button pressed");
    const place = document.getElementById("place").value;
    const startDate = new Date(document.getElementById("start").value);
    const endDate = new Date(document.getElementById("end").value);
    postData('/weather', {'place': place, 'tripDate': startDate})
    .then(weather => {
        console.log(weather);
        updateUI(JSON.stringify(weather));
    });
    postData('/image', {'place': place})
    .then(data => {
        const imageUrl = data.hits[0].largeImageURL;
        // console.log(imageUlr);
        console.log(imageUrl);
        updateImage(imageUrl);
    });
};

//     postData('/gps', {'place': place})
//     // const body = {"place":place, 
//     //               "start":dateToWeatherbitFormat(startDate),
//     //               "end":dateToWeatherbitFormat(endDate)
//     // };
//     // const body = {"place":place, 
//     //               "start":startDate,
//     //               "end":endDate };
//     // // const body = {"place":place};
//     // postData('/add', body)                 
//     .then(data => {
//         const details = data.geonames[0];
//         const country = details.countryName;
//         const lat = details.lat;
//         const lon = details.lng;
//         console.log(data.geonames[0]);
//         postData('/weather', {'lat':lat, 'lon':lon})
//         .then(data => {
//             console.log(data);
//             const temp = data.data;
//             // updateUI(temp);
//             updateUI(JSON.stringify(data.data));
//         })
//         // updateUI(JSON.stringify(data.geonames[0]));
//     });
// }





// postData('/add', {answer:42});
export {
    handleSubmit
};