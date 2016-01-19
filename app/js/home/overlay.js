function prevImage() {};
  function nextImage() {};

  var next = document.getElementById('next');
  next.addEventListener('click', function(event){
    
    
    var currentImage = document
    .getElementsByClassName('overlayPic')[0]
    var currentImageId = currentImage.getAttribute('id');   

    var imageLink = document.getElementsByClassName(currentImageId)[0];
      // console.log(currentImageId); 
      // console.log(imageLink); 


    var nextImage = document.getElementById((Number(currentImageId) + 1).toString());
      console.log('Current Image', currentImage); 
      console.log('Next Image', nextImage); 
      // console.dir(overlay); 
    imageLink.appendChild(currentImage); 
    // overlay.removeChild(currentImage);
    overlay.appendChild(nextImage);
    
  });