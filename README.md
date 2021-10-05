# getaway-app
## Plan your escape

## Description
getaway is a trip plan application. It is very simple to use. Simply type in your destination and where you want to go.

Getaway will tell you how long you have to wait before your trip and the weather at your destination. As well as displaying an image of where you are going.

If your trip is in less than a week the current weather will be displayed. If it's more than a week then the latest 16 day forcast will be shown.

## Implementation
In order to give you the information on your trip; Getaway requests infomation from various REST api's

    * Geonames - This api is used to get the GPS coordinates for a give place name.
    * Weatherbit - Provides weather data for a set of GPS coordinates. Both current and a 16 day forcast are used.
    * Pixabay - Will give us an image of our destination.

## Running the app
From the project directory, type >> npm start 
This will start the server on localhost:3000

You can then navigate to localhost:3000 in a web browser.