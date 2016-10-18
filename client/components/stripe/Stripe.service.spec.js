'use strict';

describe('Service: Stripe', function() {
  // load the service's module
  beforeEach(module('projectOviApp'));

  // instantiate service
  var Stripe;
  beforeEach(inject(function(_Stripe_) {
    Stripe = _Stripe_;
  }));

  it('should do something', function() {
    expect(!!Stripe).to.be.true;
  });
});
