if (typeof DoIKnow === 'undefined') DoIKnow = {};

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
DoIKnow.CLIENT_ID = 'dfd23d9f5385c8aa3d001496636c17e9';
DoIKnow.CLIENT_SECRET = '4fc26f0a8543313bf3c128eb2ae6c900';
DoIKnow.REDIRECT_URI = 'https://api.singly.com/robots.txt';

DoIKnow.Util = {
  accessToken: function() {
    return localStorage.singly_accessToken;
  },
  api: function(path) {
    return DoIKnow.API_HOST + path;
  }
};

