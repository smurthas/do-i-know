if (typeof DoIKnow === 'undefined') DoIKnow = {};

api = {
  facebook: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/facebook/friends'), {
      access_token: token,
      limit:1000
    }, function(list) {
      list.forEach(function(entry) {
        DB.saveName(entry.data.name);
      });
      done();
    });
  },
  instagram: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/instagram/follows'), {
      access_token: token,
      limit:1000
    }, function(list) {
      list.forEach(function(entry){
        DB.saveName(entry.data.full_name);
      });
      done();
    });
  },
  foursquare: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/foursquare/friends'), {
      access_token: token,
      limit:1000
    }, function(list) {
      list.forEach(function(entry){
        DB.saveName(entry.data.firstName+' '+entry.data.lastName);
        if(entry.data.contact && entry.data.contact.email) DB.saveEmail(entry.data.contact.email);
      });
      done();
    });
  },
  linkedin: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/linkedin/connections'), {
      access_token: token,
      limit: 10000
    }, function(connections) {
      connections.forEach(function(connection) {
        DB.saveName(connection.data.firstName + ' ' + connection.data.lastName);
      });
    done();
    });
  },
  twitter: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/twitter/friends'), {
      access_token: token,
      limit: 10000
    }, function(list) {
      console.log(list);
      list.forEach(function(friend) {
        DB.saveName(friend.data.name);
      });
      done();
    });
  },
  email: function(token, done) {
    $.getJSON(DoIKnow.Util.api('/services/email/contacts'), {
      access_token: token,
      limit: 10000
    }, function(list) {
      console.log(list);
      list.forEach(function(contact) {
        DB.saveName(contact.data.name);
        DB.saveEmail(contact.data.email);
      });
      done();
    });
  }
}

$(function() {
  DoIKnow.Util.accessToken(function(accessToken) {
    if(!accessToken || accessToken === 'undefined') return openOptions();
    $.getJSON(DoIKnow.Util.api('/profiles'), {
      access_token: accessToken
    }, function(profiles) {
      console.log("PROFILES",profiles);
      async.forEach(Object.keys(profiles), function(service, cb) {
        if(!api[service]) return cb();
        api[service](accessToken, function(){
          console.log("DONE with "+service);
          cb();
        });
      }, function(){
        console.log("ALL DONE NOW");
        DoIKnow.LOADED = true;
        console.log(DB.dump());
      });
    });
  });
});

function openOptions() {
  window.open(chrome.extension.getURL('options.html'));
}
