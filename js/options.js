if (typeof DoIKnow === 'undefined') DoIKnow = {};

DoIKnow.Options = (function() {
  function init() {
    checkProfile();
  }

  function checkProfile()
  {
    DoIKnow.Util.accessToken(function(accessToken) {
      if(!accessToken) return buildLogins({});
      console.log("TOKEN",accessToken);
      $.getJSON(DoIKnow.Util.api('/profiles'), { access_token: accessToken }, function(profiles) {
        buildLogins(profiles);
      });
    });    
  }

  function buildLogins(profiles) {
    var services = $('#services');
    services.empty();
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
    var auth = new OAuth2('singly', {
      client_id: DoIKnow.CLIENT_ID,
      client_secret: DoIKnow.CLIENT_SECRET,
      api_scope: evt.data.service
    });
    auth.authorize(function() {
      console.error("AUTHED");
      localStorage.accessToken = auth.getAccessToken();
      checkProfile();
    });
  }

  return {
    init : init
  };
})();

$(DoIKnow.Options.init);
