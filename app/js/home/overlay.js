function getOverlay() {
  return document.getElementById('lightboxImage');
}





function cyclePrevImage(event) {

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
  siblingRight.classList.add('overlayPic');

  return siblingRight;
};



function cycleNextImage(event) {
  var overlay = getOverlay();
  
  var thisImage = getCurrentImage();
  // console.dir(thisImage.image.classList);
  console.dir(thisImage);
  
  var nextImage = getNextImage();
  console.dir(nextImage);

  thisImage.link.appendChild(thisImage.image); 
  thisImage.image.classList.remove('overlayPic');

  overlay.appendChild(nextImage);

  console.log(overlay)
  
};

module.exports = {
  next: cycleNextImage,
  prev: cyclePrevImage
}