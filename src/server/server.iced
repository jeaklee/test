log = require 'loglevel'
do log.enableAll
app = require './app'

# Startup
app.listen 80, ->
    if INFO_LOG
        log.info 'Server started on port 80...'
    return

# Teardown
process.on 'exit', ->
    if INFO_LOG
        log.info 'Server stopped...'
    return

# Signals
process.on 'SIGINT', ->
    process.exit 0
    return
process.on 'SIGTERM', ->
    process.exit 0
    return
# Sent by PM2
process.on 'message', (msg) ->
    if msg == 'shutdown'
        process.exit 0
    return
# Crashes
process.on 'uncaughtException', (err) ->
    process.exit 1
    return
