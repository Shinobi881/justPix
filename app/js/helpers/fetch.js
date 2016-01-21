'use strict';

var api = require('./apilist.js');


// Make it a proper constructor
// Fetch constructor for API calls 
// Will likely need to be refactored for adding api's
// function flickrKey(){
//   return apiKeys('../keys.json');
// }


// function apiKeys(url) {
//   var req = new XMLHttpRequest;  
//   var keys = null;
//   req.open('GET', url, true);
//   req.onload = function() {
//     if (this.status >= 200 && this.status < 400) {
//       console.log('working');
//       // Success!
      
//       var keys = JSON.parse(this.response);
//       console.log(keys)
//     } else {
//       document.write('We\'re experiencing technical diffculties. Please try again later');
//     }
//   };
//   req.onerror = function() {
//     console.log('Request error');
//   };
//   req.send();
//   return keys;

// }

// function ApiCall() {
//   var req = new XMLHttpRequest();
//   this.get = function(url) {
//     // searchTag = searchTag;
//     return new Promise(function(resolve, reject) {      
//       req.open('get', url, true);
//       req.responseType = 'json';
//       req.onload = function() {
//         var status = req.status;
//         status === 200 ? resolve(req.response) : reject(status);
//       };
//       req.send();
//     })
//   }
// }




//////////////////////////////////////////////////

// Flickr API fetch
function flickrData(data) {
  console.log('Flickrdata', data);
  return JSON.parse(data);
}

function Http() {
  var req = new XMLHttpRequest;
  
  this.get = function(source, searchTag) {
    var reqUrl = source.rootUrl + source.method +
    source.key + searchTag + source.options;

    return function (container, callback) {
      req.open('GET', reqUrl, true);
      req.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          console.log('API call working');
          // Success!
          callback(flickrData(this.response).photos.photo, container);
        } else {
          document.write('<h2>We\'re experiencing technical diffculties. Please try again later<h2>');
        }
      };
      req.onerror = function() {
        console.log('Request error');
      };
      req.send();
    }
  }
}

var flickr = new Http();
// Fetch instance for the Flickr API
// var apiKeys = new ApiCall();

 
// apiKeys.get('../flickr.json')
// .then(function(data) {     
//   flickr = 
// }, function(error) {
//   document.write('There was an error.......', error);
// })
// .then(function() {

// })



module.exports = {
  flickr: flickr,
  // apiKeys: apiKeys
  // otherAPI: API
};
