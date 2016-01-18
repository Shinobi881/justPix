var fetch = require('../helpers/fetch.js');
// var landing = require('./landing.js')
/////////////////////////////////////////////////////////////////////////////
///////////////// MAKE SURE TO ESCAPE FOR MALICIOUS SCRIPTS /////////////////
/////////////////////////////////////////////////////////////////////////////

///////////////// This may be better deal with in the landing view

var tag = 'sunrise';
// Apply search params to fetch function 
function searchFlickr(searchTag){
  return fetch.flickr(searchTag);
  
}

module.exports = {searchFlickr: searchFlickr(tag)}