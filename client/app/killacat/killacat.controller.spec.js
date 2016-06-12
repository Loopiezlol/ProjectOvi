'use strict';

describe('Component: KillacatComponent', function () {

  // load the controller's module
  beforeEach(module('projectOviApp'));

  var KillacatComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    KillacatComponent = $componentController('KillacatComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);

  });
});
