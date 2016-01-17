var fetch = require('../helpers/fetch.js');
var search = require('./search.js');
// var api = require('../helpers/apilist.js');

// var test = "It works from ./js/home/landing.js.";
function test() {
  var respData = null;
  var flickrPhotos = [];
  console.log('Search', search.value);
  // console.log('Search', fetch;
  // console.log('Search' );
  return fetch.fetchFlickr('mount tamalpais')
    .then(function(data) {
      
      console.log('imageData: ', data);
    }, function(status) {
      console.log('Request error: ',status);
    })
}
module.exports = test();