const { API_KEY } = require('./keys.js').googleMaps;

// write function to call to google routes api

// main endpoint: https://maps.googleapis.com/maps/api/directions
// set origin and destination, follow with api key
// example request route:
// https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY