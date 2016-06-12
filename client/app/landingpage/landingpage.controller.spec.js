'use strict';

describe('Component: LandingpageComponent', function () {

  // load the controller's module
  beforeEach(module('projectOviApp'));

  var LandingpageComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LandingpageComponent = $componentController('LandingpageComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
