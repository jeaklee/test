assert = require('chai').assert
request = require 'supertest'
app = require '../../src/server/app'

describe 'Server', ->
    it 'should always return 200 on main page', (done) ->
        request(app)
            .get('/')
            .expect(200, done)
        return
    return
