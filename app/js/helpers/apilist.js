var landing = require('../home/landing.js');

var apiList = {
  flickr: {
    name: 'Flickr',
    rootUrl: 'https://api.flickr.com/services/rest/',
    method: '?method=flickr.photos.search&',
    key: 'api_key=' + landing.flickrKey ,
    tag: '&tags=',
    options: '&safe_search&format=json&per_page=100&nojsoncallback=?'
  }
};

module.exports = apiList;

