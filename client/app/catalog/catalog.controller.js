'use strict';
(function(){

class CatalogComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('projectOviApp')
  .component('catalog', {
    templateUrl: 'app/catalog/catalog.html',
    controller: CatalogComponent
  });

})();
