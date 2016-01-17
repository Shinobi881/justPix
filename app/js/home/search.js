var fetch = require('../helpers/fetch.js');
var landing = require('./landing.js')
/////////////////////////////////////////////////////////////////////////////
///////////////// MAKE SURE TO ESCAPE FOR MALICIOUS SCRIPTS /////////////////
/////////////////////////////////////////////////////////////////////////////

///////////////// This may be better deal with in the landing view

// Apply search params to fetch function 
function searchFlickr(){/*rake in a search object from the user*/
     
    return fetch.flickr(landing.searchTag);      
  
}

module.exports = {searchFlickr: searchFlickr}