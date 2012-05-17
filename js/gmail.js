$(function() {
  setInterval(function() {
    // if (!DoIKnow.LOADED) return;
    var lines = findLines();
    lines.each(function(i) {
      var line = lines[i];
      var from = getFrom(line);
      if (!from) return;
      if (!(DB.lookupName(from.name) || DB.lookupEmail(from.email))) getById(from.line.id).css({opacity: 0.2});
    });
  }, 1000);
});

function findBody() {
  return $('#canvas_frame').contents().find('html').find('body');
}

function findLines() {
  return findBody().find('.zA');
}

function getFrom(line) {
  var from = $(line).find('.yX .yW').children();
  if(from.length > 1) return null;
  return {
    line: line,
    name: from.html(),
    email: from.attr('email')
  };
}

function getById(id) {
  return findBody().find("#\\" + id);
}



//za == line
  //yO == read
  //zE == unread


//yX xY
//y2