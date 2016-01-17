var api = require('./apilist.js');

///////////////// MAKE SURE TO ESCAPE FOR MALICIOUS SCRIPTS /////////////////

var ApiCall = function(source) {
  // console.log(source)
  return function(searchTag) {
    console.log(searchTag);
    var reqUrl = source.rootUrl + source.method +
      source.key + searchTag + source.options;
    // console.log(reqUrl);
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

var fetchFlickr = new ApiCall(api.flickr);

module.exports = {
  fetchFlickr: fetchFlickr
};