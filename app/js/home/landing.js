var search = require('./search.js'); // gets and stores Only stores search object from here
var images = require('../helpers/imageprocessor.js'); // get the image collection
var safesearch = require('../../libs/searchsanitize.js'); // get the image collection
var lightbox = require('./lightbox.js'); // Takes in `images.collection and does lightbox stuff
var overlay = require('./overlay.js');

var fetch = require('../helpers/fetch.js');

// images.flickrImages();
  console.log(window.navigator)

var flickrKey = null;

window.addEventListener('load', function(event) {
  images.flickrImages('nature');
  spinner();
});

function spinner() {
  var stickHere = document.getElementById('spinnerDiv');
  var spin = document.createElement('img');
  setTimeout(function() {
    document.body.removeChild(spinnerDiv);

  }, 2000);
  console.log(stickHere);
}

var nextButton = document.getElementById('next');
nextButton.addEventListener('click', overlay.next);

var prevButton = document.getElementById('prev');
prevButton.addEventListener('click', overlay.prev);

var closeButton = document.getElementsByClassName('close')[0];
closeButton.addEventListener('click', overlay.close);

var searchImages = document.getElementById('search');
searchImages.addEventListener('submit', function(event){
  event.preventDefault();


  console.dir(event);
  var safe = safesearch.sanitize(this[0].value);
  console.log(safe);

  images.flickrImages(safe);
  this[0].value = "";
  return false;
});

module.exports = {
  flickrKey: flickrKey
}


