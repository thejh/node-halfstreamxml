sax = require 'sax'

last = (array) -> array[array.length-1]

exports.createParser = (cbError, cbFinished, wantedNodes, strict) ->
  interestingStack = []
  element = null
  parser = sax.parser strict
  parser.onerror = cbError
  parser.onend = cbFinished
  parser.onopentag = ({name, attributes}) ->
    if wantedNodes[name]? or element?
      parent = element
      element = {parent, name, attributes, children: []}
      parent?.children.push element
    if wantedNodes[name]?
      interestingStack.push name
  parser.onclosetag = (name) ->
    if name is last interestingStack
      interestingStack.pop()
      wantedNodes[name] element
    element = element?.parent
  parser.ontext = (text) ->
    element?.children.push text
  parser
