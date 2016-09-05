'use strict';

describe('Service: invoice', function () {

  // load the service's module
  beforeEach(module('projectOviApp'));

  // instantiate service
  var invoice;
  beforeEach(inject(function (_invoice_) {
    invoice = _invoice_;
  }));

  it('should do something', function () {
    expect(!!invoice).to.be.true;
  });

});
