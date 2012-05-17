if (typeof DoIKnow === 'undefined') DoIKnow = {};

DoIKnow.LOADED = false;
DoIKnow.EXTENSION_ID = 'cepnecmfgkbbjeiklllgikojljahmhmk';
DoIKnow.API_HOST = 'https://api.singly.com';
DoIKnow.SERVICES = [
  'facebook',
  'linkedin',
  'tumblr',
  'twitter',
  'foursquare',
  'email'
];
DoIKnow.CLIENT_ID = 'X';
DoIKnow.CLIENT_SECRET = 'X';
DoIKnow.REDIRECT_URI = 'https://api.singly.com/robots.txt';

DoIKnow.Util = {
  accessToken: function() {
    return localStorage.singly_accessToken;
  },
  api: function(path) {
    return DoIKnow.API_HOST + path;
  }
};

