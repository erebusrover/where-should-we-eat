const { CLIENT_ID, API_KEY } = require('./keys').yelp;

// write function for yelp api calls here

// search params:
// location or lat/lng
// categories: a list of comma-delimited categories that we get from user preferences:
// https://www.yelp.com/developers/documentation/v3/all_category_list
// limit: 5?
// sort_by: rating?
// price: get from user preferences

// Yelp API notes
// daily limit: 500
// main endpoint: https://api.yelp.com/v3/businesses/search
// To get detailed information and reviews,
// use the Business ID returned from main endpoint with
// /businesses/{id} and /businesses/{id}/reviews endpoints.
// https://www.yelp.com/developers/documentation/v3/get_started
// visit https://www.yelp.com/developers/v3/manage_app?app_created=True to refresh API key

// thoughts:
// maybe we want to only show restaurants with 4 or 5 star reviews
