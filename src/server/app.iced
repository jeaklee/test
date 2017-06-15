express = require 'express'
log = require 'loglevel'
path = require 'path'

app = express()

# Browser detection middleware
app.use (request, response, next) ->
    if request.headers['user-agent'].indexOf("MSIE") >= 0
        response.locals.ie = true
    else
        response.locals.ie = false
    do next
    return

# Routes
app.use '/', require './router'

# Static
app.use '/res/img', express.static path.join(__dirname, '..', 'img')
app.use '/res/fonts', express.static path.join(__dirname, '..', 'fonts')
app.use '/res/css', express.static path.join(__dirname, '..', 'css')
app.use '/res/js', express.static path.join(__dirname, '..', 'js')

# Error handling
app.use (err, request, response, next) ->
    if TRACE_LOG
        log.trace err.stack
    if ERROR_LOG
        log.error err
    do next
    return
    
module.exports = app
