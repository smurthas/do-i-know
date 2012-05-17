if (typeof DoIKnow === 'undefined') DoIKnow = {};

api = {
  facebook: function(done) {
    
  }
}

$(function() {
  if(!DoIKnow.Util.accessToken()) return console.log("NO TOKEN");
  $.getJSON(DoIKnow.Util.api('/profiles'), {
    access_token: DoIKnow.Util.accessToken()
  }, function(profiles) {
    _.each(Object.keys(profiles), function(service) {
      if(api[service]) api[service](function(){console.log("DONE with "+service)});
    });
  });
});
