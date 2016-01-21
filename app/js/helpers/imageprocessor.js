'use strict';

var fetch = require('../helpers/fetch.js');
var el = require('./elements.js');


// Callback to process the API data and turn it into elements
function processAPIData(collection, container) {
  return collection.map(function(photo, id){
    var flickrData = el.flickrProcessor(photo, id);
    var imageTag = el.imageTagCreator(flickrData);
    var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

    el.appendImages(container, imageLink);

    return imageLink;
  });
}

// Grab the api data from the JSON file in the root and call the api
function flickrImages(searchTag) {
  var imageContainer = document.getElementById('thumbContainer');
  imageContainer.innerHTML = '';

  var apiData = new XMLHttpRequest;
  apiData.open('GET', '../api.json', true);
  apiData.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      console.log('API call working');
      fetch.flickr.get(JSON.parse(this.response).flickr, searchTag)(imageContainer, processAPIData);
    } else {
      document.write('We\'re experiencing technical diffculties. Please try again later.');
    }
  };
  apiData.onerror = function() {
    console.log('Request error');
  };
  apiData.send();

};

module.exports = {flickrImages: flickrImages};

