'use strict';

describe('Service: cake', function () {

  // load the service's module
  beforeEach(module('projectOviApp'));

  // instantiate service
  var cake;
  beforeEach(inject(function (_cake_) {
    cake = _cake_;
  }));

  it('should do something', function () {
    expect(!!cake).to.be.true;
  });

});
