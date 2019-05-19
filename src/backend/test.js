
var request = require('supertest');
var app = require('./app.js');

describe('Test the mail subscriptions', () =>
  {
    test('It should fail if invalid mail', (done) => {
      request(app).post('/terkz').then((response) => {
        expect(response.statusCode).toBe(422);
        done();

      })
    }),
    test('It should succeed if valid mail is provided', (done) => {
      request(app).post('/zob@laposte.fr').then((response) => {
        expect(response.statusCode).toBe(200);
        done();

      })
    }),
    test('It should be able to validate an email', async (done) => {
      const theMail = 'zob@laposte.fr';
      const server = request(app)
      server.post('/' + theMail);
      server.put('/' + theMail);
      const response = await server.get('/');
      expect(JSON.parse(response.text)).toContain(theMail);
      done();
    });
  })


