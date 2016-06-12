'use strict';
(function(){

class LandingpageComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('projectOviApp')
  .component('landingpage', {
    templateUrl: 'app/landingpage/landingpage.html',
    controller: LandingpageComponent
  });

})();
