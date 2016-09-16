'use strict';

describe('Service: details', function() {
  // load the service's module
  beforeEach(module('projectOviApp'));

  // instantiate service
  var details;
  beforeEach(inject(function(_details_) {
    details = _details_;
  }));

  it('should do something', function() {
    expect(!!details).to.be.true;
  });
});
