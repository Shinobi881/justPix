function getOverlay() {
  return document.getElementById('overlay');
}

function cyclePrevImage() {

};

function getCurrentImage() {
  var currentImage = document.getElementsByClassName('overlayPic')[0];
  var currentImageId = currentImage.getAttribute('id');   
  var imageLink = document.getElementsByClassName(currentImageId)[0];
  
  return {
    image: currentImage, 
    id: currentImageId,
    link: imageLink
  };
}

function getNextImage() {
  var currentId = getCurrentImage().id;
  var siblingRight = document.getElementById((Number(currentId) + 1).toString());

  return siblingRight;
};

var nextButton = document.getElementById('next');
nextButton.addEventListener('click', cycleNextImage);

function cycleNextImage() {
  var thisImage = getCurrentImage();
  var nextImage = getNextImage();
  thisImage.link.appendChild(thisImage.image); 
  getOverlay().appendChild(nextImage);
  
};

module.exports = {
  next: cycleNextImage,
  prev: cyclePrevImage
}