express = require 'express'
render = require './render'
log = require 'loglevel'

router = express.Router()

router.get '/', (req, res) ->
    render res, (require '../html/index.pug')
    if INFO_LOG
        log.info 'GET on /'
    return

router.get '/about', (req, res) ->
    render res, (require '../html/about.pug'), title: "About Page"
    if INFO_LOG
        log.info 'GET on /about'
    return

router.get '/team', (req, res) ->
    render res, (require '../html/team.pug'), title: "Our Team"
    if INFO_LOG
        log.info 'GET on /team'
    return

module.exports = router
