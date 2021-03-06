'use strict';

// Get the div for the lightbox image
function getOverlay() {
  return document.getElementById('lightboxImage');
}

// Det the lightbox image title
function getOverlayTitle() {
  return document.getElementById('lightboxTitle');
}

// Close the overlay and remove any images on it
function closeOverlay() {
  var overlay = getOverlay();
  var overlayTitle = getOverlayTitle();

  overlay.innerHTML = '';
  overlayTitle.innerHTML = '';
}

// Get the current image in the overlay
function getCurrentImage() {
  var currentImage = getOverlay().children[0];
  var currentImageId = currentImage.getAttribute('id');   
  var imageLink = document.getElementsByClassName(currentImageId)[0];
  
  return {
    image: currentImage, 
    id: currentImageId,
    link: imageLink
  };
}

// Get the next image and clone itfor the overlay
function getNextImage() {
  var currentId = getCurrentImage().id;
  var siblingRight = document.getElementById((Number(currentId) + 1).toString());

  siblingRight = siblingRight.cloneNode();
  siblingRight.classList.add('overlayPic');

  return siblingRight;
}

// Get the previous image and clone it for the overlay
function getPrevImage() {
  var currentId = getCurrentImage().id;
  var siblingLeft = document.getElementById((Number(currentId) - 1).toString());

  siblingLeft = siblingLeft.cloneNode();
  siblingLeft.classList.add('overlayPic');

  return siblingLeft;
}

// Append the next image to the overlay
function cycleNextImage() {
  var overlay = getOverlay();
  var thisImage = getCurrentImage();
  var nextImage = getNextImage();
  var imageTitle = getOverlayTitle();

  imageTitle.innerHTML = thisImage.image.title;
  overlay.innerHTML = '';
  nextImage.classList.remove('thumb');
  overlay.appendChild(nextImage);
}

// Append the previous image to the overlay
function cyclePrevImage() {
  var overlay = getOverlay();
  var thisImage = getCurrentImage();
  var prevImage = getPrevImage();
  var imageTitle = getOverlayTitle();

  imageTitle.innerHTML = thisImage.image.title;
  overlay.innerHTML = '';
  prevImage.classList.remove('thumb');
  overlay.appendChild(prevImage);
}

module.exports = {
  next: cycleNextImage,
  prev: cyclePrevImage,
  close: closeOverlay
};