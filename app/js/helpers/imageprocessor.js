var search = require('../home/search.js');
var fetch = require('../helpers/fetch.js');
var el = require('./elements.js');


// After being passed all over the place, finally calls the Flickr API, processes the photos and returns an array of 'Photo' instances

function flickrImages(searchTag) {
  var imageContainer = document.getElementById('thumbContainer');
  imageContainer.innerHTML = '';
  var imageArray = null;
  
  fetch.flickr(searchTag)
  .then(function(data) {

      imageArray = data.photos.photo.map(function(photo, id){
        var flickrData = el.flickrProcessor(photo, id)
        var imageTag = el.imageTagCreator(flickrData);
        var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

        el.appendImages(imageContainer, imageLink);

        return imageLink;
      });
  }, function(error) {
    console.log('There was an error.......', error);
  });


};

module.exports = {flickrImages: flickrImages};

