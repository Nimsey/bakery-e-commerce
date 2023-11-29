var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');
var agent = request.agent(app);

// before(function(done) {
//   db.sequelize.sync({ force: true }).then(function() {
//     done();
//   });
// });

describe('GET /profile/2', function() {
  it('should redirect to /auth/login if not logged in', function(done) {
    request(app).get('/profile/3')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });

  it('should return a 200 response if logged in', function(done) {
    agent.post('/auth/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      email: 'susan2@email.com',
      name: 'susan2',
      password: 'letmein33!!'
    })
    .expect(302)
    .expect('Location', '/')
    .end(function(error, res) {
      if (error) {
        done(error);
      } else {
        agent.get('/profile/3')
        .expect(200, done);
      }
    });
  });
});
