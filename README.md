# justPix
*Search for and filter pictures from Flickr, Google and Instagram.*

###User Story
*On load, the user should:*

- See a grid of photo thumbnails
- When a thumbnail is clicked, the photo should be displayed in a lightbox view
- Have the ability to move to the next / previous photos and display the photo title (lightbox view)
- User should be able to use site on latest versions of Chrome, Firefox, Safari, Internet Explorer
- Update UI without refreshing the page
- Run without errors
- [Search justPix](http://shinobi881.github.io/justPix/app/index.html)

*Backlog:*

- Try to break the code 
- Be able to select photos from a carousel while in the lightbox view
- User should be able filter currently displayed photos by: date, type
  - Common properties or keywords ("transparent background", HD, icon avalable keyword properties...)
  - Type of photo (.jpg, .gif, .png, .bmp...)


#Installation
*Instructions for building with webpack*

1. `$ npm install`
1. `$ npm install -g webpack` 
2. `$ npm install -g webpack-dev-server`                
4. `$ webpack-dev-server --progress --colors`
5. Open a browser window and navigate to: `http://localhost:8080/webpack-dev-server/app/index.html`


*More Info*

- [Issues and workflow](./documentation/ISSUES.md)
- [Technologies](./documentation/TECH-STACK.md)

#Contributing
*Please adhere to the style and contribution guides when making pull request and be courteous and appropriate when adding/commenting on issues*

1. [Contribution Guide](CONTRIBUTING.md)
2. [Style guide](STYLE-GUIDE.md)

#Application Structure

###Home Directory
*Will handle all user facing functionality*

- lightbox.js - Handler for lightbox view and controls
- landing.js - Handler for the main app view/subviews (search, lighbox)

###Helpers Directory
*Handle API's, fetching and processing of images*

- elements.js - Functions for creating and appending to DOM 
- fetch.js - This will define fetching for each API used (from apilist.js)
- imageprocessor.js - Process all image data returned from fetch (may be furthur broken up)

###libs Directory
- sanitize.js - sanitize/protech the search form

`Browser compatibility`:
IE - 
- Download Virtual Box: https://www.virtualbox.org/wiki/Downloads
- Download VM for IE (and _MS Edge too_): https://dev.windows.com/en-us/microsoft-edge/tools/vms/mac/
- Then: `http://10.0.2.2:8080/webpack-dev-server/app/index.html`