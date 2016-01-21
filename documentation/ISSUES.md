
###Shipping: 
[x] - Search Images
[] - Thumbanail container
[x] - Image Lightbox
  [x] - Add image to overlay
  [x] - Cycle images (in overlay)
  [x] - Display image title
[x] - Close Overlay

[x] - Spinner
[x] - Error with search
[X] - Please search again
[x] - IE11 Compatible

###Open Issues:
*Issue: Spinner on search*
*Issue: Debug transition errors with Chrome, Safari, Firefox*

###Issues Closed: 
*Issue: `IE11` Compatibilty - callbacks all over theplace*
*Issue: close overlay on page load*
*Issue: Make sure over lay background image sizes correctly*
*Issue: Style overlay image title*
*Issue: Style overlay buttons*
*Issue: Style search form*
*Issue: Character escape `Search`*
*Issue: IE does not support `Promise`*

*Issue: `clone node` instead of referencing from dom*
  - Solved: node cloned 
*Issue: Remove images on overlay open and close close*
  - Solved: Remove images when close buttong is clicked
*Issue: images only change once*
  - Sovled: Remove `'overlayPic'` class name when remove from overlay 
*Issue: Removing image from thumbnail container, needs to be copied*
  - Solved: `cloneNode`
*Issue: Character escape search form*
  - Solved: *`js/helpers/serachsanitize.js`*

###Backlog:
*Issue: Integrate multiple API's*
*Issue: improper use of `class` attribute for image `anchors`*
*Issue: Custom 404 error HTML*
*Issue: Change default landing images at regular intervals*
*Issue: Display image collection at bottom of the lightbox*
*Issue: Style labels*

###Milestone: *User search for image tags*
  - Script protection
  - Animate to indicate interaction
  - Style 

###Milestone: *Thumbnails container*
  - Size images uniformly
  - Apply hover animation 

###Milestone: *Cylce through images in overlay*
*OverlayImage:*

- append image as a child to overlay, onclick
- remove image (if present) add current image as child

*Cycle Images*

- Get the image id of child image 
- Get it's sibling from the image collection
- remove child and append sibling

*Possible ways of doing this:*

A. Append images to Overlay
  1. `current` = Grab the current overlay image 
  2. `next` = Grab the image with an id++ to current image
  3. prepend `current` to next
  4. append `next` to overlay


B. Set styles for overlay class
  1. function (`setAttribute('overlayImage')`);
  2. Onclick of set click coords on click 
  3. Next/prev coord => remove overlayImage class apply to next/prev image

C. Add prototype function to `Photo` class
  1. Similar to the first two but will just create a new `img` and apply method `B`

*Overlay Image Title:*

###Cycle Image issues:


###Milestone: *Improve basic user experience*
- Add spinner
- Paginate 
- User description

###Milestone: *Animations*
- Transitions
 - Images entering view
 - Overlay opening 
 - cycling to next image
