if (typeof DoIKnow === 'undefined') DoIKnow = {};

api = {
  twitter: function(done) {
    $.getJSON(DoIKnow.Util.api('/services/twitter/friends'), {
      access_token: DoIKnow.Util.accessToken()
    }, function (friends) {
      _.each(Object.keys(friends), function(friend) {
        DB.saveName(friend[name]);
      });
    });
    done();
  },
  linkedin: function(done) {
    $.getJSON(DoIKnow.Util.api('/services/linkedin/connections'), {
      access_token: DoIKnow.Util.accessToken()
      }, function (connections) {
        _.each(Object.keys(connections), function(connection) {
          DB.saveName(connection[firstName] + ' ' + connection[lastName]);
        });
      });
    done();
  },
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
