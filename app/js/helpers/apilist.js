var apiList = {
  flickr: {
    name: 'Flickr',
    rootUrl: 'https://api.flickr.com/services/rest/',
    method: '?method=flickr.photos.search&',
    key: 'api_key=d7b5799416ae2ea346791364f3d8bd7c&tags=',
    options: '&safe_search&format=json&per_page=100&nojsoncallback=?'
  }
}

module.exports = apiList;

