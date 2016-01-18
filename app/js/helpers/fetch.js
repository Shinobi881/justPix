var api = require('./apilist.js');
var Promise = require('promise-polyfill');

// Fetch constructor for API calls 
// Will likely need to be refactored for adding api's
var ApiCall = function(source) {
  return function(searchTag) {
    // searchTag = searchTag;
    var reqUrl = source.rootUrl + source.method +
      source.key + searchTag + source.options;
      console.log(searchTag);
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      
      req.open('get', reqUrl, true);
      req.responseType = 'json';
      req.onload = function() {
        var status = req.status;
        status === 200 ? resolve(req.response) : reject(status);
      };
      req.send();
    })
  }
}

// Fetch instance for the Flickr API
var flickr = new ApiCall(api.flickr);

module.exports = {
  flickr: flickr,
  // otherAPI: API
};