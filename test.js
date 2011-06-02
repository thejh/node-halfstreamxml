(function() {
  var halfstreamxml, onerror, onfinish, parser, wantednodes;
  halfstreamxml = require('./index');
  onerror = function(e) {
    return console.error("ERROR: " + e);
  };
  onfinish = function() {
    return console.log("DONE");
  };
  wantednodes = {
    PERSON: function(person) {
      return console.log("received person: " + (JSON.stringify(person, ['name', 'attributes', 'age', 'children'])));
    }
  };
  parser = halfstreamxml.createParser(onerror, onfinish, wantednodes, false);
  parser.write('<xml><person age="15"><name>Barfoo</name></person><person age="17"><name>Foo Bar</name></person></xml>').close();
}).call(this);
