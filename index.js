(function() {
  var last, sax;

  sax = require('sax');

  last = function(array) {
    return array[array.length - 1];
  };

  exports.createParser = function(cbError, cbFinished, wantedNodes, strict) {
    var element, interestingStack, parser;
    interestingStack = [];
    element = null;
    parser = sax.parser(strict);
    parser.onerror = cbError;
    parser.onend = cbFinished;
    parser.onopentag = function(_arg) {
      var attributes, name, parent;
      name = _arg.name, attributes = _arg.attributes;
      if ((wantedNodes[name] != null) || (element != null)) {
        parent = element;
        element = {
          parent: parent,
          name: name,
          attributes: attributes,
          children: {
            all: [],
            tags: [],
            text: []
          }
        };
        if (parent != null) {
          parent.children.all.push(element);
          if (!(parent.children.tags[name] != null)) {
            parent.children.tags[name] = new Array;
          }
          parent.children.tags[name].push(element);
        }
      }
      if (wantedNodes[name] != null) return interestingStack.push(name);
    };
    parser.onclosetag = function(name) {
      if (name === last(interestingStack)) {
        interestingStack.pop();
        wantedNodes[name](element);
      }
      return element = element != null ? element.parent : void 0;
    };
    parser.ontext = function(text) {
      if (element != null) element.children.all.push(text);
      return element != null ? element.children.text.push(text) : void 0;
    };
    return parser;
  };

  exports.createStream = function(cbError, cbFinished, wantedNodes, strict) {
    var element, interestingStack, stream;
    interestingStack = [];
    element = null;
    stream = sax.createStream(strict);
    stream.on("error", cbError);
    stream.on("end", cbFinished);
    stream.on("opentag", function(_arg) {
      var attributes, name, parent;
      name = _arg.name, attributes = _arg.attributes;
      if ((wantedNodes[name] != null) || (element != null)) {
        parent = element;
        element = {
          parent: parent,
          name: name,
          attributes: attributes,
          children: {
            all: [],
            tags: [],
            text: []
          }
        };
        if (parent != null) {
          parent.children.all.push(element);
          if (!(parent.children.tags[name] != null)) {
            parent.children.tags[name] = new Array;
          }
          parent.children.tags[name].push(element);
        }
      }
      if (wantedNodes[name] != null) return interestingStack.push(name);
    });
    stream.on("closetag", function(name) {
      if (name === last(interestingStack)) {
        interestingStack.pop();
        wantedNodes[name](element);
      }
      return element = element != null ? element.parent : void 0;
    });
    stream.on("text", function(text) {
      if (element != null) element.children.all.push(text);
      return element != null ? element.children.text.push(text) : void 0;
    });
    return stream;
  };

}).call(this);
