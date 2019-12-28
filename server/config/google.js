const axios = require('axios');
const { API_KEY } = require('./keys.js').googleMaps;

// make api call to google to get user location
const getUserLocation = () => {
  const geolocateUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;
  return axios.post(geolocateUrl);
};

module.exports.getUserLocation = getUserLocation;

// NOTE --> the rest of this file may be unnecessary.
// might make more sense to just provide users with a url
// to send them to google maps in app or browser

// From Google docs:
// The Geolocation API returns a location and accuracy radius based on information
// about cell towers and WiFi nodes that the mobile client can detect.
// POST to:
// https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY

// // https://developers.google.com/maps/documentation/javascript/directions
// const directions = (restaurant) => {
//   // TODO: get lat lng of user
//   userLocation().then((response) => {
//     const { location } = response.data;
//     // console.log(location);
//     return location;
//   })
//     .then(() => {
//       // TODO: get latlng of restaurant
//     }).then(() => {
//     // TODO: create directionsRequest object and get directions from google api
//     // const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocale}&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY`
//     // axios.get()
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// Directions API
// main endpoint: https://maps.googleapis.com/maps/api/directions
// example request route:
// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY
