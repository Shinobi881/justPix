var search = require('../home/search.js');
var fetch = require('../helpers/fetch.js');
var el = require('./elements.js');


// After being passed all over the place, finally calls the Flickr API, processes the photos and returns an array of 'Photo' instances
function processAPI(collection, container) {
  return collection.map(function(photo, id){
    var flickrData = el.flickrProcessor(photo, id)
    var imageTag = el.imageTagCreator(flickrData);
    var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

    el.appendImages(container, imageLink);

    return imageLink;
  });
};

function flickrImages(searchTag) {
  var imageContainer = document.getElementById('thumbContainer');
  imageContainer.innerHTML = '';
  var imageArray = null;
  
  
  // fetch.apiKeys.get()
  // .then(function(data) {     
  //   // imageArray = data;
  // }, function(error) {
  //   document.write('There was an error.......', error);
  // })
  

  var apiData = new XMLHttpRequest;
  apiData.open('GET', '../flickr.json', true);
  apiData.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      console.log('API call working');
      // Success!
      console.log(this.response);
      fetch.flickr.get(JSON.parse(this.response).flickr, searchTag)(imageContainer, processAPI);
    } else {
      document.write('<h2>We\'re experiencing technical diffculties. Please try again later<h2>');
    }
  };
  apiData.onerror = function() {
    console.log('Request error');
  };
  apiData.send();






  // fetch.flickr(searchTag)
  // .then(function(data) {

  //     imageArray = data.photos.photo.map(function(photo, id){
  //       var flickrData = el.flickrProcessor(photo, id)
  //       var imageTag = el.imageTagCreator(flickrData);
  //       var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

  //       el.appendImages(imageContainer, imageLink);

  //       return imageLink;
  //     });
  // }, function(error) {
  //   console.log('There was an error.......', error);
  // });


};

module.exports = {flickrImages: flickrImages};

