var search = require('../home/search.js');

// var imageColletion = null;
// Append a promise to the search function
// Process images and return to landing view



// Image processing functions
  // _Photo Object_ class (photoObject)
    // Image url 
    // Image title
    // Image ID
    // Image thumbnail
    // OPTION click-handler for lightbox

function ImageTag(obj) {

}

function Photo(photoObject) {
  this.imageUrl = photoObject.imageUrl;
  this.title = photoObject.title;
  this.id = photoObject.id;

  
};

// Flickr photos array === photos.photo

function flickrProcessor(photoArray) {
  
  return photoArray.map(function(photo, i) {
    // console.log(photo)
    var newPhoto = {};

    // Flickr image Url
    newPhoto.imageUrl = 'https://farm' +
    photo.farm + '.static.flickr.com/' +
    photo.server + '/' +
    photo.id + '_' +
    photo.secret + '.jpg';

    // Flickr image title
    newPhoto.title = photo.title;

    // Id for new photo for reference in the lightbox 
    newPhoto.id = i;

    return new Photo(newPhoto);
  })
};

// After being passed all over the place, finally calls the Flickr API, processes the photos and returns an array of 'Photo' instances
var imageContainer = document.getElementById('thumbContainer');


function flickrImages() {
  var imageArray = [];
  
  search.searchFlickr
  .then(function(data) {
    imageArray = flickrProcessor(data.photos.photo);
    console.log(imageArray);

  }, function(error) {
    console.log('There was an error.......', error);
  })
  .then(function(){
    // var domImage = document.createElement('img')
    // .setAttribute('class', 'thumb')
    // .setAttribute('src', image.imageUrl);


  imageArray.forEach(function(image, index) {
    var domImage = document.createElement('img');
    domImage.setAttribute('class', 'thumb')
    domImage.setAttribute('src', image.imageUrl);

    imageContainer.appendChild(domImage);
    console.log(domImage);
    // console.log(image)

    });
  })

  return imageArray;
  
};

module.exports = {flickrImages: flickrImages};

