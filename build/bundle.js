/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.head.appendChild(el);
/******/ 	}());

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var landing = __webpack_require__(1);
	var css = __webpack_require__(7);

	// document.write(landing);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var images = __webpack_require__(2); 
	var safesearch = __webpack_require__(5); 
	var overlay = __webpack_require__(6);

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




/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fetch = __webpack_require__(3);
	var el = __webpack_require__(4);


	// Callback to process the API data and turn it into elements
	function processAPIData(collection, container) {
	  return collection.map(function(photo, id){
	    var flickrData = el.flickrProcessor(photo, id);
	    var imageTag = el.imageTagCreator(flickrData);
	    var imageLink = el.imageLinkCreator(imageTag.iTag, imageTag.id);

	    el.appendImages(container, imageLink);

	    return imageLink;
	  });
	}

	// Grab the api data from the JSON file in the root and call the api
	function flickrImages(searchTag) {
	  var imageContainer = document.getElementById('thumbContainer');
	  imageContainer.innerHTML = '';

	  var apiData = new XMLHttpRequest;
	  apiData.open('GET', '../api.json', true);
	  apiData.onload = function() {
	    if (this.status >= 200 && this.status < 400) {
	      console.log('API call working');
	      fetch.flickr.get(JSON.parse(this.response).flickr, searchTag)(imageContainer, processAPIData);
	    } else {
	      document.write('We\'re experiencing technical diffculties. Please try again later.');
	    }
	  };
	  apiData.onerror = function() {
	    console.log('Request error');
	  };
	  apiData.send();

	};

	module.exports = {flickrImages: flickrImages};



/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// Flickr API fetch for async purposes
	function flickrData(data) {
	  return JSON.parse(data);
	}

	// Fetch class for flickr API (IE11 compatible)
	function FlickrFetch() {
	  var req = new XMLHttpRequest;
	  
	  this.get = function(source, searchTag) {
	    var reqUrl = source.rootUrl + source.method +
	    source.key + searchTag + source.options;

	    return function (container, callback) {
	      req.open('GET', reqUrl, true);
	      req.onload = function() {
	        if (this.status >= 200 && this.status < 400) {
	          // Success!
	          callback(flickrData(this.response).photos.photo, container);
	        } else {
	          document.write('We\'re experiencing technical diffculties. Please try again later.');
	        }
	      };
	      req.onerror = function() {
	        console.log('Request error');
	      };
	      req.send();
	    };
	  };
	}

	var flickr = new FlickrFetch();

	module.exports = {
	  flickr: flickr,
	  // otherAPI: API
	};

	// console.log(window.navigator.vendor);


/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	var NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

	function encodeEntities(value) {
	  return value.
	    replace(/&/g, '&amp;').
	    replace(SURROGATE_PAIR_REGEXP, function(value) {
	      var hi = value.charCodeAt(0);
	      var low = value.charCodeAt(1);
	      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
	    }).
	    replace(NON_ALPHANUMERIC_REGEXP, function(value) {
	      return '&#' + value.charCodeAt(0) + ';';
	    }).
	    replace(/</g, '&lt;').
	    replace(/>/g, '&gt;');
	}

	module.exports = {
	  sanitize: encodeEntities
	};

	// Test Scripts

	/*
	>"'><script>alert(‘XSS')</script>
	>%22%27><img%20src%3d%22javascript:alert(%27XSS%27)%22>
	>"'><img%20src%3D%26%23x6a;%26%23x61;%26%23x76;%26%23x61;%26%23x73;%26%23x63;%26%23x72;%26%23x69;%26%23x70;%26%23x74;%26%23x3a;alert(%26quot;XSS%26quot;)>
	AK%22%20style%3D%22background:url(javascript:alert(%27XSS%27))%22%20OS%22
	%22%2Balert(%27XSS%27)%2B%22
	<table background="javascript:alert(([code])"></table>
	<object type=text/html data="javascript:alert(([code]);"></object>
	<body onload="javascript:alert(([code])"></body>
	*/

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "body {\n  margin: 5%;\n  padding: 0;\n  background: #4c4c4c; /* Old browsers */\n  background: -moz-linear-gradient(top,  #4c4c4c 0%, #595959 12%, #666666 25%, #474747 34%, #2c2c2c 43%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* FF3.6-15 */\n  background: -webkit-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 34%,#2c2c2c 43%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 34%,#2c2c2c 43%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-9 */\n\n}\n\n/**************** Search ******************/\n#searchForm {\n  text-align: center;\n\n}\n\n.button {\n  -moz-box-shadow:inset 0px 1px 3px 0px #91b8b3;\n  -webkit-box-shadow:inset 0px 1px 3px 0px #91b8b3;\n  box-shadow:inset 0px 1px 3px 0px #91b8b3;\n  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #768d87), color-stop(1, #6c7c7c));\n  background:-moz-linear-gradient(top, #768d87 5%, #6c7c7c 100%);\n  background:-webkit-linear-gradient(top, #768d87 5%, #6c7c7c 100%);\n  background:-o-linear-gradient(top, #768d87 5%, #6c7c7c 100%);\n  background:-ms-linear-gradient(top, #768d87 5%, #6c7c7c 100%);\n  background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);\n  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#768d87', endColorstr='#6c7c7c',GradientType=0);\n  background-color:#768d87;\n  -moz-border-radius:5px;\n  -webkit-border-radius:5px;\n  border-radius:5px;\n  border:1px solid #566963;\n  display:inline-block;\n  cursor:pointer;\n  color:#ffffff;\n  font-family:Arial;\n  font-size:15px;\n  font-weight:bold;\n  padding:11px 23px;\n  text-decoration:none;\n  text-shadow:0px -1px 0px #2b665e;\n}\n.button:hover {\n  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #6c7c7c), color-stop(1, #768d87));\n  background:-moz-linear-gradient(top, #6c7c7c 5%, #768d87 100%);\n  background:-webkit-linear-gradient(top, #6c7c7c 5%, #768d87 100%);\n  background:-o-linear-gradient(top, #6c7c7c 5%, #768d87 100%);\n  background:-ms-linear-gradient(top, #6c7c7c 5%, #768d87 100%);\n  background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);\n  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#6c7c7c', endColorstr='#768d87',GradientType=0);\n  background-color:#6c7c7c;\n}\n.button:active {\n  position:relative;\n  top:1px;\n}\n\ninput[type=\"text\"] {\n  padding: 10px;\n  border: solid 1px #dcdcdc;\n  transition: box-shadow 0.3s, border 0.3s;\n  -webkit-border: solid 1px #dcdcdc;\n  -webkit-transition: box-shadow 0.3s, border 0.3s;\n      \n}\n\ninput[type=\"text\"]:focus {\n  border: solid 1px #707070;\n  box-shadow: 0 0 5px 1px #969696;\n  -webkit-border: solid 1px #707070;\n  -webkit-box-shadow: 0 0 5px 1px #969696; \n}\n\n#searchTitle {\n  font-family: \"Lucida Console\", Monaco, monospace;\n}\n\n/************** Thumbnails ***************/\n a .thumb {\n  display: inline-block;\n  height: 200px;\n  width: 200px;\n  animation: fadein 2s;\n   -webkit-animation: fade-in .1s ease 6s 1 reverse forwards;\n  -moz-animation: fade-in .1s ease 6s 1 reverse forwards;\n  -o-animation: fade-in .1s ease 6s 1 reverse forwards;\n\n}\n\n\n.thumb:hover {\n  font-weight: bold;\n  box-shadow: 2px 2px 10px 0px #9C0505, 4px 4px 9px 0px #000000;\n  transition-duration: 0.5s;\n  transform: translate3d(-3px, -3px, 5px);\n  -ms-transform: translate3d(-3px, -3px, 5px);\n  \n  -moz-transform: translate3d(-3px, -3px, 5px);\n  -webkit-font-smoothing: antialiased;\n  -webkit-transition-property: transform;\n  -webkit-transition-duration: 0.5s;\n  \n  -webkit-trannsform: translate3d(-3px, -3px, 5px);\n  -webkit-font-smoothing: antialiased;\n  -webkit-transition-property: transform;\n  -webkit-transition-duration: 0.5s;\n}\n\n#thumbContainer {\n  margin-left: 9%;\n}\n\n/***** Animations that only work on IE11 _of all things?!_ ****/\n@keyframes fadeOut {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n\n@keyframes fadeIn {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n\n-o-@keyframes fadeIn {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n\n-moz-@keyframes fadeIn {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n\n-webkit-@keyframes fadeIn {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n\n-ms-@keyframes fadeIn {\n  from {opacity: 0;}\n  to {opacity: 1;}\n}\n/*/////////////// Spinner //////////////////*/\n.spinner {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 200px;\n    height: 200px;\n    margin:-60px 0 0 -60px;\n    opacity: 0.7;\n    -webkit-animation: spin 4s linear infinite;\n    -moz-animation: spin 4s linear infinite;\n    animation: spin 4s linear infinite;\n}\n@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }\n@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }\n@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }\n\n/************* Overlay Properties **************/\n\n/**{margin:0;padding:0;}*/\n\n.overlayDiv {\n  display: inline-block;\n  position: relative;\n  max-height: 300px;\n  max-width: 300px;\n  overflow: auto;\n}\n\n#overlay {\n  height: 70%;\n  width: 40%;\n  margin: 5%;\n  background: white;\n  background-image: url('http://goo.gl/SRkQ3O');\n  background-repeat: repeat;\n  background-size: 100%;\n  position: fixed;\n  color: black;\n  padding: 10px;\n  position: absolute;\n  top: 6%;\n  left: 25%;\n  z-index: 1000;\n  display: none;\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  -o-border-radius: 10px;\n  border-radius: 10px;\n  animation: fadein 2s;\n  -webkit-animation: fadein 2s;\n  -moz-animation: fadein 2s;\n  -0-animation: fadein 2s;\n}\n\n\n.show {\n  transition: opacity 1000ms;\n}\n\n#lightboxImage {\n  margin-right: 10%;\n}\n\n\n#lightboxTitle {\n  color: white;\n  text-align: center;\n  line-height: 20px;\n  text-shadow: 2px 5px 8px #FF0000;\n}\n\n/*Apply styles to overlay picture*/\n#overlay .overlayPic {\n  position: absolute;\n  margin: auto;\n  max-height: auto;\n  max-width: 100%;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  box-shadow: 2px 2px 10px 0px #9C0505, 4px 4px 9px 0px #000000;\n  transition-duration: 0.5s;\n  transform: translate3d(-3px, -3px, 5px);\n  -ms-transform: translate3d(-3px, -3px, 5px);\n}\n\n#mask{ /* create are mask */\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0,0,0,0.6);\n    z-index: 500;\n    width: 100%;\n    height: 100%;\n    display: none;\n    transition-property: opacity, left, top, height;\n    transition-duration: 3s, 5s;\n}\n/* use :target to look for a link to the overlay then we find are mask */\n#overlay:target, #overlay:target + #mask{\n    display: block;\n    opacity: 1;\n    transition: all 0.5s ease-out;\n    transition-property: opacity, left, top, height;\n    transition-duration: 3s, 5s;\n}\n.close{ /* overlay close button close button */\n    display: block;\n    position: absolute;\n    top: -10px;\n    right: -10px;\n    background: transparent;\n    color: gray;\n    height: 60px;\n    width: 60px;\n    line-height: 60px;\n    font-size: 35px;\n    text-decoration: none;\n    text-align: center;\n    font-weight: bold;\n    -webkit-border-radius: 40px;\n    -moz-border-radius: 40px;\n    -o-border-radius: 40px;\n    border-radius: 40px;\n}\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);