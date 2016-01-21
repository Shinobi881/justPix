'use strict';

var images = require('../helpers/imageprocessor.js'); 
var safesearch = require('../../libs/searchsanitize.js'); 
var overlay = require('./overlay.js');

var flickrKey = null;

// Spinner for on page load. Needs a class for search
function spinner() {
  var stickHere = document.getElementById('spinnerDiv');
  setTimeout(function() {
    document.body.removeChild(stickHere);
  }, 2000);
}

// Page load event listener
window.addEventListener('load', function(event) {
  document.location = '#';
  images.flickrImages('nature');
  spinner();
});

// Append event to lightbox 'next button'
var nextButton = document.getElementById('next');
nextButton.addEventListener('click', overlay.next);

// Append event to lightbox 'prev button'
var prevButton = document.getElementById('prev');
prevButton.addEventListener('click', overlay.prev);


// Append event to lightbox 'close (X) button'
var closeButton = document.getElementsByClassName('close')[0];
closeButton.addEventListener('click', overlay.close);

// Search/submit form
var searchImages = document.getElementById('search');
searchImages.addEventListener('submit', function(event){
  event.preventDefault();

  var safe = safesearch.sanitize(this[0].value);

  images.flickrImages(safe);
  this[0].value = '';
  return false;
});

module.exports = {
  flickrKey: flickrKey
};


