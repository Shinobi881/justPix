'use strict';

// Flickr API fetch for async purposes
function flickrData(data) {
  return JSON.parse(data);
}

// Fetch class for flickr API (IE11 compatible)
function FlickrFetch() {
  var req = new XMLHttpRequest;
  
  this.get = function(source, searchTag) {
    var reqUrl = source.rootUrl + source.method +
    source.key + searchTag + source.options;

    return function (container, callback) {
      req.open('GET', reqUrl, true);
      req.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          callback(flickrData(this.response).photos.photo, container);
        } else {
          document.write('We\'re experiencing technical diffculties. Please try again later.');
        }
      };
      req.onerror = function() {
        console.log('Request error');
      };
      req.send();
    };
  };
}

var flickr = new FlickrFetch();

module.exports = {
  flickr: flickr,
  // otherAPI: API
};

// console.log(window.navigator.vendor);
