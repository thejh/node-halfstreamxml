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
      element = {parent, name, attributes, children: {all: [], tags: [], text: []}}
      if parent?
        parent.children.all.push element
        if not parent.children.tags[name]?
          parent.children.tags[name] = new Array
        parent.children.tags[name].push element
    if wantedNodes[name]?
      interestingStack.push name
  parser.onclosetag = (name) ->
    if name is last interestingStack
      interestingStack.pop()
      wantedNodes[name] element
    element = element?.parent
  parser.ontext = (text) ->
    element?.children.all.push  text
    element?.children.text.push text
  parser

exports.createStream = (cbError, cbFinished, wantedNodes, strict) ->
  interestingStack = []
  element = null
  stream = sax.createStream strict
  stream.on "error" , cbError
  stream.on "end"   , cbFinished
  stream.on "opentag",  ({name, attributes}) ->
    if wantedNodes[name]? or element?
      parent = element
      element = {parent, name, attributes, children: {all: [], tags: [], text: []}}
      if parent?
        parent.children.all.push element
        if not parent.children.tags[name]?
          parent.children.tags[name] = new Array
        parent.children.tags[name].push element
    if wantedNodes[name]?
      interestingStack.push name
  stream.on "closetag",  (name) ->
    if name is last interestingStack
      interestingStack.pop()
      wantedNodes[name] element
    element = element?.parent
  stream.on "text",  (text) ->
    element?.children.all.push  text
    element?.children.text.push text
  stream
