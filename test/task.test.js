var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');
var agent = request.agent(app);


    // describe('GET /profile/:userId', function () {
    //     it('should return a 200 response', function (done) {
    //         request(app).get('/profile/5').expect(200, done);
    //     });
    // });

    // describe('GET /profile', function() {
    //     it('should redirect to /auth/login if not logged in', function(done) {
    //       request(app).get('/profile')
    //       .expect('Location', '/auth/login')
    //       .expect(302, done);
    //     });
    //     });