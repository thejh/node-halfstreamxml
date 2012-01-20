halfstreamxml = require './index'

onerror = (e) ->
  console.error "ERROR: #{e}"
onfinishparser = ->
  console.log "PARSER TEST DONE\n"
onfinishstream = ->
  console.log "STREAM TEST DONE\n"

wantednodes =
  PERSON: (person) ->
    str = JSON.stringify {
      name: person.children.tags.NAME[0].children.text.join()
      age: person.attributes.age
    }
    console.log "received person: #{str}"

xml = '<xml><person age="15"><name>Barfoo</name></person><person age="17"><name>Foo Bar</name></person></xml>'

parser = halfstreamxml.createParser onerror, onfinishparser, wantednodes, false
stream = halfstreamxml.createStream onerror, onfinishstream, wantednodes, false

parser.write(xml).close()
stream.write(xml)
stream.end()