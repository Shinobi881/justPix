// var search = require('./search.js'); // gets and stores Only stores search object from here
var images = require('../helpers/imageprocessor.js'); // get the image collection
var lightbox = require('./lightbox.js'); // Takes in `images.collection and does lightbox stuff
var overlay = require('./overlay.js');

console.log(overlay)

function searchBox(search) {
  return search;
}

images.flickrImages() /////////////// UNCOMMENT

var nextButton = document.getElementById('next');
nextButton.addEventListener('click', overlay.next);

var prevButton = document.getElementById('prev');
prevButton.addEventListener('click', overlay.prev);

var closeButton = document.getElementsByClassName('close')[0];
closeButton.addEventListener('click', overlay.close);


// console.log(imageContainer)


// loop through the image collection
// Create an image element and append it to the document

// images.flickrImages()
// .forEach(function(image, index) {
//   // var domImage = document.createElement('img')
//   // .setAttribute('class', 'thumb')
//   // .setAttribute('src', image.imageUrl);

//   // imageContainer.appendChild(domImage);
//   console.log(image)

// });

// function putImagesOnDom() {
  
//   var domImage = document.createElement('img')
//   .setAttribute('class', 'thumb')
//   .setAttribute('src', image.imageUrl);

//   console.log(domImage);

// };


// Lightbox









module.exports = {};