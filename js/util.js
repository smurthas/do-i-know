if (typeof DoIKnow === 'undefined') DoIKnow = {};

DoIKnow.LOADED = false;
DoIKnow.EXTENSION_ID = 'jlhjfkmmifpacdfmbnpfficecgjlload';
DoIKnow.API_HOST = 'https://api.singly.com';
DoIKnow.SERVICES = [
  'facebook',
  'linkedin',
  'instagram',
  'twitter',
  'foursquare',
  'email'
];
DoIKnow.CLIENT_ID = '8022041c914717a00486964255c47e76';
DoIKnow.CLIENT_SECRET = '1b09d6bac2dffa255b48fe65f01a7c92';
DoIKnow.REDIRECT_URI = 'https://api.singly.com/robots.txt';

DoIKnow.Util = {
  accessToken: function(callback) {
    chrome.extension.sendRequest({method:'getAccessToken'}, function(response) {
      callback(response.accessToken);
    });
  },
  api: function(path) {
    return DoIKnow.API_HOST + path;
  }
};

