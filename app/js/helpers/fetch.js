var api = require('./apilist.js');
var Promise = require('promise-polyfill');

// Make it a proper constructor
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

// var ApiCall = function(source) {
//   this.req = new XMLHttpRequest();
//   return function(searchTag) {
//     var reqUrl = source.rootUrl + source.method +
//       source.key + searchTag + source.options;
//       console.log(searchTag);
//     return new Promise(function(resolve, reject) {
      
//       req.open('get', reqUrl, true);
//       req.responseType = 'json';
//       req.onload = function() {
//         var status = req.status;
//         status === 200 ? resolve(req.response) : reject(status);
//       };
//       req.send();
//     })
//   }
// }





// function flickrIE(source) {
//   var apiData = null;
  
//   var reqUrl = source.rootUrl + source.method +
//     source.key + 'sunrise' + source.options;
//     // console.log(searchTag);
  
//   var request = new XMLHttpRequest();
//   request.open('GET', reqUrl, true);
//   request.onload = function() {
//     if (this.status >= 200 && this.status < 400) {
//       // Success!
//       apiData = flickrData(this.response);
//       console.log(data);
//     } else {
//       // We reached our target server, but it returned an error

//     }
//     request.onerror = function() {
//       console.log('Request error');
//     };
//     request.send();
//   };
    
//   return apiData;
// }

function flickrData(data) {
  return JSON.parse(data);
}

function Http(source) {
  var req = new XMLHttpRequest;
  
  this.get = function(searchTag, container, callback) {

    
    var reqUrl = source.rootUrl + source.method +
    source.key + searchTag + source.options;
    req.open('GET', reqUrl, true);
    req.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        console.log('working')
        // Success!
        callback(flickrData(this.response).photos.photo, container);
        // console.log(api_data);
      } else {
        // We reached our target server, but it returned an error

      }
    };
    req.onerror = function() {
      console.log('Request error');
    };
    req.send();
  };
};




// var flickrIECall = new Http();
// console.log(flickrIECall.get(api.flickr));




// Fetch instance for the Flickr API
var flickr = new Http(api.flickr);

module.exports = {
  flickr: flickr,
  // otherAPI: API
};