'use strict';

describe('Service: Invoiced', function() {
  // load the service's module
  beforeEach(module('projectOviApp'));

  // instantiate service
  var Invoiced;
  beforeEach(inject(function(_Invoiced_) {
    Invoiced = _Invoiced_;
  }));

  it('should do something', function() {
    expect(!!Invoiced).to.be.true;
  });
});
