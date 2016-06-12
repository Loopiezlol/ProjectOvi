'use strict';
(function(){

class KillacatComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('projectOviApp')
  .component('killacat', {
    templateUrl: 'app/killacat/killacat.html',
    controller: KillacatComponent
  });

})();
