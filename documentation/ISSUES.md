- IE does not support `Promise`
- Character escape `Search` 

###Open Issues:
*Issue: close overlay on page load*
*Issue: Make sure over lay background image sizes correctly*
*Issue: Spinner on search*
*Issue: Style overlay image title*
*Issue: Style overlay buttons*
*Issue: Style search form*


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
[] - Please search again
[x] - IE11 Compatible


###Milestone: *User search for image tags*
  Issue: *Character escape search form*
   - Solved: *`js/helpers/serachsanitize.js`*

###Milestone: *Thumbnails container*


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

*Issue: `clone node` instead of referencing from dom*
 - Solved: node cloned
 
*Issue: Remove images on overlay open and close close*
  - Solved: Remove images when close buttong is clicked

*Issue: images only change once*
  - Sovled: Remove `'overlayPic'` class name when remove from overlay 


*Issue: Removing image from thumbnail container, needs to be copied*
  - Solved: `cloneNode`


###Milestone: *Improve basic user experience*
- Add spinner
- Paginate 
- User description

###Milestone: *Animations*
- Transitions
 - Images entering view
 - Overlay opening 
 - cycling to next image


###Issues Closed: 
*Issue: `IE11` Compatible*

###Bakclog:
*Issue: improper use of `class` attribute for image `anchors`*
*Issue: Custom 404 error HTML*
*Issue: Change defaule landing query at regular intervals*
*Issue: Display image collection at bottom of the lightbox*


*Other:*

- `<datalist>`
- `<label>`