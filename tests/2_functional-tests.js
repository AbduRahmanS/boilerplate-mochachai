const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('Integration tests with chai-http', function() {
    // #1
    test('Test GET /hello with no name', function(done) {
      chai
        .request(server)
        .get('/hello')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function(done) {
      chai
        .request(server)
        .get('/hello?name=abdurahman')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello abdurahman');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function(done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          "surname": "Colombo"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, "Cristoforo")
          assert.equal(res.body.surname, "Colombo")
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function(done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          "surname": "da Verrazzano"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, "Giovanni")
          assert.equal(res.body.surname, "da Verrazzano")
          done();
        });
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai.abdurahmans1.repl.co';
const browser = new Browser({
  waitDuration: 29*1000
});

suite("Functional Tests with Zombie.js", function() {
  const browser = new Browser(
    //{waitDuration: 5 * 1000}
  );
  suiteSetup(function done() {
    return browser.visit("/", done);
  });
  suite('"Famous Italian Explorers" form', function() {
    // #5
    test('submit {"surname" : "Colombo"} - write your e2e test...', function(done) {
      browser.fill("surname", "Colombo").then(
        browser.pressButton("submit", function() {
          browser.assert.success();
          browser.assert.text("span#name", "Cristoforo");
          browser.assert.text("span#surname", "Colombo");
          browser.assert.element("span#dates", 1);
          done();
        })
        );
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function(done) {
      browser.fill("surname", "Vespucci").pressButton("submit", function() {
        browser.assert.success();
        browser.assert.text("span#name", "Amerigo");
        browser.assert.text("span#surname", "Vespucci");
        browser.assert.element("span#dates", 1);
        done();
      });
    });
  });
});
