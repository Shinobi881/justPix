var fetch = require('../helpers/fetch.js');
var landing = require('./landing.js')
/////////////////////////////////////////////////////////////////////////////
///////////////// MAKE SURE TO ESCAPE FOR MALICIOUS SCRIPTS /////////////////
/////////////////////////////////////////////////////////////////////////////

///////////////// This may be better deal with in the landing view

var tag = null;

function searchFlickr(searchTag){
  if (searchTag) {
    return fetch.flickr(searchTag);
  }
  
  return fetch.flickr('sunrise');
}

// var searchImages = document.getElementById('search');
// searchImages.addEventListener('submit', function(event){
//   event.preventDefault();

//   console.dir(event)
//   // console.dir()
//   tag = searchFlickr(this[0].value);
//   this[0].value = "";
//   return false;
// });

// Apply search params to fetch function 

module.exports = {userSearch: searchFlickr};