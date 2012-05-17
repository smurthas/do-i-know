if (typeof DoIKnow === 'undefined') DoIKnow = {};

api = {
  facebook: function(done) {
    $.getJSON(DoIKnow.Util.api('/services/facebook/friends'), {
      access_token: DoIKnow.Util.accessToken(),
      limit:1000
    }, function(list) {
      _.each(list, function(entry){
        DB.saveName(entry.data.name);
      });
      done();
    });
  },
  instagram: function(done) {
    $.getJSON(DoIKnow.Util.api('/services/instagram/follows'), {
      access_token: DoIKnow.Util.accessToken(),
      limit:1000
    }, function(list) {
      _.each(list, function(entry){
        DB.saveName(entry.data.full_name);
      });
      done();
    });
  },
  foursquare: function(done) {
    $.getJSON(DoIKnow.Util.api('/services/foursquare/friends'), {
      access_token: DoIKnow.Util.accessToken(),
      limit:1000
    }, function(list) {
      _.each(list, function(entry){
        DB.saveName(entry.data.firstName+' '+entry.data.lastName);
        if(entry.data.contact && entry.data.contact.email) DB.saveEmail(entry.data.contact.email);
      });
      done();
    });
  }
}

$(function() {
  if(!DoIKnow.Util.accessToken()) return console.log("NO TOKEN");
  $.getJSON(DoIKnow.Util.api('/profiles'), {
    access_token: DoIKnow.Util.accessToken()
  }, function(profiles) {
    console.log("PROFILES",profiles);
    async.forEach(Object.keys(profiles), function(service, cb) {
      if(api[service]) api[service](function(){
        console.log("DONE with "+service);
        cb();
      });
    }, function(){
      console.log("ALL DONE NOW");
      DoIKnow.loaded = true;
    });
  });
});
