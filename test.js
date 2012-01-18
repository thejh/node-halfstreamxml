(function() {
  var halfstreamxml, onerror, onfinishparser, onfinishstream, parser, stream, wantednodes, xml;

  halfstreamxml = require('./index');

  onerror = function(e) {
    return console.error("ERROR: " + e);
  };

  onfinishparser = function() {
    return console.log("PARSER TEST DONE\n");
  };

  onfinishstream = function() {
    return console.log("STREAM TEST DONE\n");
  };

  wantednodes = {
    PERSON: function(person) {
      var str;
      str = JSON.stringify({
        name: person.children.tags.NAME[0].children.text.join(),
        age: person.attributes.age
      });
      return console.log("received person: " + str);
    }
  };

  xml = '<xml><person age="15"><name>Barfoo</name></person><person age="17"><name>Foo Bar</name></person></xml>';

  parser = halfstreamxml.createParser(onerror, onfinishparser, wantednodes, false);

  stream = halfstreamxml.createStream(onerror, onfinishstream, wantednodes, false);

  parser.write(xml).close();

  stream.write(xml);

  stream.end();

}).call(this);
