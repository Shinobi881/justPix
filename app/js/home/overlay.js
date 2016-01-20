function getOverlay() {
  return document.getElementById('lightboxImage');
}

function getOverlayImage() {
  return document.getElementById('overlay');
}

function getNextImage() {
  var currentId = getCurrentImage().id;
  var siblingRight = document.getElementById((Number(currentId) + 1).toString());
  siblingRight.classList.add('overlayPic');

  return siblingRight;
};

function getPrevImage(event) {
  var currentId = getCurrentImage().id;
  var siblingLeft = document.getElementById((Number(currentId) - 1).toString());
  siblingLeft.classList.add('overlayPic');
  console.log(siblingLeft)

  return siblingLeft;
};

function getCurrentImage() {
  var currentImage = getOverlay().children[0]
  var currentImageId = currentImage.getAttribute('id');   
  var imageLink = document.getElementsByClassName(currentImageId)[0];
  
  return {
    image: currentImage, 
    id: currentImageId,
    link: imageLink
  };
}

function removeLightboxImage() {
  var olayContainer = getOverlay();
  olayCcontainer.children
}


function closeOverlay() {
  var olayImage = getCurrentImage();
  var overlay = getOverlay();

  olayImage.link.appendChild(olayImage.image);
  olayImage.image.classList.remove('overlayPic');
}


function cycleNextImage(event) {
  var overlay = getOverlay();
  var thisImage = getCurrentImage();
  var nextImage = getNextImage();

  thisImage.link.appendChild(thisImage.image); 
  thisImage.image.classList.remove('overlayPic');
  overlay.appendChild(nextImage);

};

function cyclePrevImage(event) {
  var overlay = getOverlay();
  var thisImage = getCurrentImage();
  var prevImage = getPrevImage();

  thisImage.link.appendChild(thisImage.image); 
  thisImage.image.classList.remove('overlayPic');
  overlay.appendChild(prevImage);

};

module.exports = {
  next: cycleNextImage,
  prev: cyclePrevImage,
  close: closeOverlay
}