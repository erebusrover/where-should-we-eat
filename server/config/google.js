const axios = require('axios');
const googleMaps = require('@google/maps');
const { API_KEY } = require('./keys.js').googleMaps;

// create new Google Maps client object, use Promises
const googleMapsClient = googleMaps.createClient({
  key: API_KEY,
  Promise: Promise,
});


// From Google docs:
// The Geolocation API returns a location and accuracy radius based on information
// about cell towers and WiFi nodes that the mobile client can detect.
// POST to:
// https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

// get user's current location
const userLocation = () => {
  // googleMapsClient.geolocate()
  //   .asPromise()
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // get lat/lng
  const geolocateUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;
  axios.post(geolocateUrl).then((response) => {
    const { location } = response.data;
    console.log(location);
    return location;
  })
  // .then((location) => {
  //   // change to user-friendly location info?
  //   const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
  //   axios.get(geocodeUrl).then((response) => {
  //     console.log(response);
  //   });
  // })
    .catch((error) => {
      console.log(error);
    });
};

userLocation();


// Directions API
// main endpoint: https://maps.googleapis.com/maps/api/directions
// example request route:
// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY