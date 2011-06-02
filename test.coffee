halfstreamxml = require './index'
onerror = (e) ->
  console.error "ERROR: #{e}"
onfinish = ->
  console.log "DONE"
wantednodes =
  PERSON: (person) ->
    console.log "received person: #{JSON.stringify person, ['name', 'attributes', 'age', 'children']}"
parser = halfstreamxml.createParser onerror, onfinish, wantednodes, false
parser.write('<xml><person age="15"><name>Barfoo</name></person><person age="17"><name>Foo Bar</name></person></xml>').close()
