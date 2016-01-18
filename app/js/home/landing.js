// var search = require('./search.js'); // gets and stores Only stores search object from here
var images = require('../helpers/imageprocessor.js'); // get the image collection
var lightbox = require('./lightbox.js'); // Takes in `images.collection and does lightbox stuff

function searchBox(search) {
  return search;
}


// console.log(images.flickrImages());

images.flickrImages().map(function(imageObj) {
  console.log("Image obj", imageObj);
})

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
  // var imageContainer = document.getElementById('thumbContainer');

function putImagesOnDom() {
  
  // var domImage = document.createElement('img')
  // .setAttribute('class', 'thumb')
  // .setAttribute('src', image.imageUrl);

  // console.log(domImage);

};


// Lightbox









module.exports = {dom: putImagesOnDom};