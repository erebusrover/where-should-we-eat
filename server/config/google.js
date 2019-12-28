const { API_KEY } = require('./keys.js').googleMaps;

// write function(s) to call to google routes api


// TODO: use geolocation API to get user's current location
// From Google docs:
// The Geolocation API returns a location and accuracy radius based on information
// about cell towers and WiFi nodes that the mobile client can detect.
// POST to:
// https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY
const userLocation = () => {
  
};


// Directions API
// main endpoint: https://maps.googleapis.com/maps/api/directions
// set origin and destination, follow with api key
// example request route:
// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY