// Photo object Class
function Photo(photoObject) {
  this.imageUrl = photoObject.imageUrl;
  this.title = photoObject.title;
  this.id = photoObject.id;
};

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
};


// Create an anchor tag add an image tag, child
function imageLinkCreator(imageElement, id) {
  var overlayLink = document.createElement('a');
  var overlay = document.getElementById('lightboxImage');
  var overlayTitle = document.getElementById('lightboxTitle');
  

  overlayLink.setAttribute('href', '#overlay');
  overlayLink.classList.add(id);
  overlayLink.appendChild(imageElement);
  
  overlayLink.addEventListener('click', function(event) {
    var imageOnly = this.children[0];
    var imageTitle = imageOnly.title
    
    var imageClone = this.children[0].cloneNode();

    console.log("image clone", imageClone);



    overlayTitle.innerHTML = "";
    overlay.innerHTML = "";
    // console.dir(overlay.innerHTML);
    overlayTitle.innerHTML = imageTitle;

    imageClone.classList.add('overlayPic');
    overlay.appendChild(imageClone);

  });

  return overlayLink;
};

// Create an image tag
function imageTagCreator(imageObject) {  
    var domImage = document.createElement('img');    
    domImage.classList.add('thumb');
    domImage.src = imageObject.imageUrl;
    domImage.id = imageObject.id;
    domImage.title = imageObject.title || 'No Title';
    
    return {iTag: domImage, id: imageObject.id};
};

// Append Images to DOM
function appendImages(container, imageElement) {
  container.appendChild(imageElement);
};

module.exports = {
  flickrProcessor: flickrProcessor,
  imageLinkCreator: imageLinkCreator,
  imageTagCreator: imageTagCreator, 
  appendImages: appendImages,
};