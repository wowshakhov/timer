var assert = require('assert');
var test = require('../test.js');
var sinon = require('sinon');
var timer = new test.timer.Test();

before(function() {
  this.clock = sinon.useFakeTimers();
});

after(function() {
  this.clock.restore();
});

describe("delay", function() {
  it("delay test", function() {
    var timer = new test.timer.Test();
    var f = timer.test_delay();
    this.clock.tick(500);
    assert.equal(timer.flag, 0, "premature assignment");
    this.clock.tick(700);
    assert.equal(timer.flag, 1, "assignment didn\'t occur");
  });
});

describe("debounce", function() {
  it("debounce test", function() {
    var timer = new test.timer.Test();
    timer.test_debounce();
    this.clock.tick(20);
    assert.equal(timer.flag, 1, "initial assignment didn\'t occur");
    this.clock.tick(500);
    timer.test_debounce();
    assert.equal(timer.flag, 1, "assignment during cooldown");
    this.clock.tick(1000);
    timer.test_debounce();
    assert.equal(timer.flag, 2, "assignment after cooldown didn\'t occur");
  });
});

describe("cumulative debounce", function() {
  it("cumulative debounce test", function() {
    var timer = new test.timer.Test();
    timer.test_cumulative_debounce();
    this.clock.tick(200);
    assert.equal(timer.flag, 1, "initial assignment didn\'t occur");
    this.clock.tick(600);
    timer.test_cumulative_debounce();
    assert.equal(timer.flag, 1, "assignment during cooldown");
    this.clock.tick(800);
    timer.test_cumulative_debounce();
    assert.equal(timer.flag, 1, "assignment during cooldown (2)");
    timer.test_cumulative_debounce();
    assert.equal(timer.flag, 1, "assignment during cooldown (3)");
    this.clock.tick(1200);
    timer.test_cumulative_debounce();
    assert.equal(timer.flag, 2, "assignment after cooldown didn\'t occur");
  });
});

describe("throttle", function() {
  it("throttle test", function() {
    var timer = new test.timer.Test();
    timer.test_throttle();
    this.clock.tick(20);
    assert.equal(timer.flag, 1, "initial assignment didn\'t occur");
    this.clock.tick(500);
    timer.test_throttle();
    assert.equal(timer.flag, 1, "assignment during cooldown");
    this.clock.tick(1000);
    timer.test_throttle();
    assert.equal(timer.flag, 2, "assignment after cooldown didn\'t occur");
    this.clock.tick(100);
    timer.test_throttle();
    this.clock.tick(1000);
    assert.equal(timer.flag, 3, "final assignment didn\'t occur");
  });
});
