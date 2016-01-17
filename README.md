# justPix
*Search for and filter pictures from Flickr, Google and Instagram.*

###User Story
*On load, the user should:*
- See a grid of photo thumbnails
- When a thumbnail is clicked, the photo should be displayed in a lightbox view
- Have the ability to move to the next / previous photos and display the photo title (lightbox view)
- User should be able to use site on latest versions of Chrome, Firefox, Safari, Internet Explorer
- Be able to select photos from a carousel while in the lightbox view

*Backlog:*
- User should be able to search for photos via keyword query
- User should be able filter currently displayed photos by:
  - Common properties or keywords ("transparent background", HD, icon avalable keyword properties...)
  - Type of photo (.jpg, .gif, .png, .bmp...)
- User should be able to

#Installation
*Instructions for building with webpack*

1. `$ npm install -g webpack` 
2. `$ npm install -dwebpack-dev-server`                
4. `$ webpack-dev-server`
5. Open a browser window and navigate to `localhost:8080/app`

#Contributing
*Please adhere to the style and contribution guides when making pull request and be courteous and appropriate when adding/commenting on issues*

1. [Contribution Guide](CONTRIBUTING.md)
2. [Style guide](STYLE-GUIDE.md)

#Application Structure

###Home Directory
*Will handle all user facing functionality*

- search.js - Handler for user search data/view
- lightbox.js - Handler for lightbox view and controls
- landing.js - Handler for the main app view/subviews (search, lighbox)

###Helpers Directory
*Handle API's, fetching and processing of images*

- apilist.js - List of all API objects used for fetching
- fetch.js - This will define fetching for each API used (from apilist.js)
- imageprocessor.js - Process all image data returned from fetch (may be furthur broken up)