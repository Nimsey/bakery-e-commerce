var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');
var agent = request.agent(app);

describe('GET /profile/:userId', function () {
    // let loggedInUser = null;

    before(function (done) {
        agent.post('/auth/signup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                email: 'susan2@email.com',
                name: 'susan2',
                password: 'gateKeeper33!!'
            })
            .end(function (err, res) {
                // const {id} = res.body;
                loggedInUser = res.params;
                console.log(`loggedinuser: ${loggedInUser}`);
                done();
            });
    });

    it('should return the profile page for a logged-in user', function (done) {
        agent.get(`/profile/${loggedInUser.id}`)
            .expect(200, done);
    });
});
