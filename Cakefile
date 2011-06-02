{spawn} = require 'child_process'
fs = require 'fs'

task 'build', 'coffee -> js', ->
  files = (file for file in fs.readdirSync '.' when file.match(/\.coffee$/))
  proc = spawn 'coffee', ['-c'].concat files
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.on        'exit', (status) -> process.exit(1) if status != 0
