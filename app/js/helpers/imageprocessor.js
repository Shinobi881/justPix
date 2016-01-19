var search = require('../home/search.js');
var el = require('./elements.js');

// After being passed all over the place, finally calls the Flickr API, processes the photos and returns an array of 'Photo' instances

function flickrImages() {
  var imageContainer = document.getElementById('thumbContainer');
  var imageArray = null;
  
  search.searchFlickr
  .then(function(data) {

      imageArray = data.photos.photo.map(function(photo, id){
        var flickrData = el.flickrProcessor(photo, id)
        var imageTag = el.imageTagCreator(flickrData);
        var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

        el.appendImages(imageContainer, imageLink);

        return imageLink;
      });
    console.log(imageArray[30]);
  }, function(error) {
    console.log('There was an error.......', error);
  });


};

module.exports = {flickrImages: flickrImages};

