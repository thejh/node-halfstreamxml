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
          children: []
        };
        if (parent != null) {
          parent.children.push(element);
        }
      }
      if (wantedNodes[name] != null) {
        return interestingStack.push(name);
      }
    };
    parser.onclosetag = function(name) {
      if (name === last(interestingStack)) {
        interestingStack.pop();
        wantedNodes[name](element);
      }
      return element = element != null ? element.parent : void 0;
    };
    parser.ontext = function(text) {
      return element != null ? element.children.push(text) : void 0;
    };
    return parser;
  };
}).call(this);
