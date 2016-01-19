- IE does not support `Promise`
- Character escape `Search` 

###Shipping: 
- Search Images
- Thumbanail container
- Image Overlay
  - Add image overlay
  - Display image title
  - Cycle images (in overlay)
- Close Overlay

###Milestone: *Thumbnails container*
  *Issue: improper use of `class` attribute for image `anchors`*

###Milestone: *Cylce through images in overlay*
*OverlayImage:*

- append image as a child to overlay, onclick
- remove image (if present) add current image as child
  
  *Issue: Removing image from thumbnail container, needs to be copied*
    - Solved: `appendBefore` next image `onclick` next

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

    *Issue: images only change once*
      - Sovled: Remove `'overlayPic'` class name when remove from overlay 

B. Set styles for overlay class
  1. function (`setAttribute('overlayImage')`);
  2. Onclick of set click coords on click 
  3. Next/prev coord => remove overlayImage class apply to next/prev image

C. Add prototype function to `Photo` class
  1. Similar to the first two but will just create a new `img` and apply method `B`



###Milestone: *Improve basic user experience*
- Add spinner
- Paginate 
- User description

###Milestone: *Animations*
- Transitions
 - Images entering view
 - Overlay opening 
 - cycling to next image

*Other:*

- `<datalist>`
- `<label>`