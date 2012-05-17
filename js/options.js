DoIKnowif (typeof DoIKnow === 'undefined') DoIKnow = {};

DoIKnow.Options = (function() {
  function init() {
    var token = DoIKnow.Util.accessToken();
    if (token) {
      $.getJSON(DoIKnow.Util.api('/profiles'), {
        access_token: token
      }, function(profiles) {
        buildLogins(profiles);
      });
    } else {
      buildLogins({});
    }
  }

  function buildLogins(profiles) {
    var services = $('#services');
    _.each(DoIKnow.SERVICES, function(service) {
      var li = $('<li>').text(service + ' ');
      if (profiles[service]) {
        li.append('&#10004;');
      } else {
        li.append(
          $('<a>', { href: '#' })
            .text("Connect")
            .click({service: service}, authorizeService)
        );
      }
      services.append(li);
    });
  }

  function authorizeService(evt) {
    evt.preventDefault();
    var token = DoIKnow.Util.accessToken();
    if (token) {
      chrome.tabs.create({
        url: DoIKnow.API_HOST + '/oauth/authorize?' + $.param({
               client_id: DoIKnow.CLIENT_ID,
               redirect_uri: DoIKnow.REDIRECT_URI,
               service: evt.data.service
        })
      });
    } else {
      var auth = new OAuth2('singly', {
        client_id: DoIKnow.CLIENT_ID,
        client_secret: DoIKnow.CLIENT_SECRET,
        api_scope: evt.data.service
      });
      auth.authorize(function() {
        location.reload();
      });
    }
  }

  return {
    init : init
  };
})();

$(DoIKnow.Options.init);
