if (typeof DoIKnow === 'undefined') DoIKnow = {};

DoIKnow.Popup = (function() {

  function check(tab) {
    var token = DoIKnow.Util.accessToken();
    if (!token) {
      chrome.tabs.create({
        url: 'options.html'
      });
      return;
    }
    $('#checking .url').text(tab.title);
    fetchLinks(function(links) {
      var link = links[tab.url];
      if (link) {
        fillPosters(link);
        $('#checking, #already_posted').toggle();
      } else {
        $('#checking, #post').toggle();
      }
    });
  }

  function fetchLinks(done) {
    $.getJSON(DoIKnow.Util.api('/types/news'), {
      access_token: DoIKnow.Util.accessToken(),
      limit: 300
    }, function(links) {
      _.each(links, function(link) {
        var url = link.data.link;
        if (url) {
          if (!links[url]) links[url] = [];
          links[url].push({
            name: link.data.from.name,
            time: link.data.created_time
          });
        }
      });
      done(links);
    }).error(error);
  }

  function fillPosters(posters) {
    var list = $('#already_posted .posters');
    _.each(posters, function(poster) {
      list.append($('<li>').append(
        $('<span>', {'class': 'name'})
          .text(poster.name),
        $('<span>', {'class': 'time'})
          .text(' on ' + new Date(poster.time * 1000))
      ));
    });
  }


  function error() {
    $('#checking, #error').toggle();
  }

  return {
    check : check
  };
})();

$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    DoIKnow.Popup.check(tab);
  });
});
