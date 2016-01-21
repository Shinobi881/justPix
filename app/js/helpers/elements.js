'use strict';

// Photo object Class
function Photo(photoObject) {
  this.imageUrl = photoObject.imageUrl;
  this.title = photoObject.title;
  this.id = photoObject.id;
}

// Process API data into array of _Photo_ objects
function flickrProcessor(photoData, tagId) {
    var newPhoto = {};
    // Flickr image Url
    newPhoto.imageUrl = 'https://farm' +
    photoData.farm + '.static.flickr.com/' +
    photoData.server + '/' +
    photoData.id + '_' +
    photoData.secret + '.jpg';

    // Flickr image title and id
    newPhoto.title = photoData.title;
    newPhoto.id = tagId;

    return new Photo(newPhoto);
}

// Onclick, sending an image to the lighbox view
function imageLinkCreator(imageElement, id) {
  var overlayLink = document.createElement('a');
  var overlay = document.getElementById('lightboxImage');
  var overlayTitle = document.getElementById('lightboxTitle');
  
  overlayLink.setAttribute('href', '#overlay');
  overlayLink.classList.add(id);
  overlayLink.appendChild(imageElement);
  
  overlayLink.addEventListener('click', function(event) {
    var imageOnly = this.children[0];
    var imageTitle = imageOnly.title;
    var imageClone = this.children[0].cloneNode();

    overlayTitle.innerHTML = '';
    overlay.innerHTML = '';
    overlay.classList.add('fadeIn');
    overlayTitle.innerHTML = imageTitle;

    imageClone.classList.add('overlayPic');
    imageClone.classList.remove('thumb');
    overlay.appendChild(imageClone);

  });

  return overlayLink;
}

// Create an image tag
function imageTagCreator(imageObject) {  
    var domImage = document.createElement('img');    
    domImage.classList.add('thumb');
    domImage.classList.add('fadeIn');
    domImage.src = imageObject.imageUrl;
    domImage.id = imageObject.id;
    domImage.title = imageObject.title || 'No Title';
    
    return {iTag: domImage, id: imageObject.id};
}

// Append Images to DOM
function appendImages(container, imageElement) {
  imageElement.classList.add('fadeIn');
  container.appendChild(imageElement);
}

module.exports = {
  flickrProcessor: flickrProcessor,
  imageLinkCreator: imageLinkCreator,
  imageTagCreator: imageTagCreator, 
  appendImages: appendImages,
};