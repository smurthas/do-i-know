$(function() {
  setTimeout(function() {
    var lines = findLines();
    // console.log('lines', lines);
    var froms = [];
    lines.each(function(i) {
      var line = lines[i];
      var from = getFrom(line);
      if(!from) return;
      froms.push(from);
      console.log('from:', from)
      console.log('id:', getById(from.line.id));
      getById(from.line.id).css({color: '#ddd'});
      getById(from.line.id).find('.y2').css({color: '#ddd'});
    });
    // console.log(froms);
  }, 6000);
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