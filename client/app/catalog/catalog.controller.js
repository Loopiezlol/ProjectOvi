'use strict';
(() => {

  class CatalogComponent {

    constructor(Cake, socket, $state) {
      this.cakes = Cake.query();
      this.Cake = Cake;
      this.newCake = new Cake();
      this.initial = new Cake();
      this.socket = socket;
      this.$state = $state;

    }





    $onInit() {

    }

    go(id) {
      this.$state.go('cake', { id: id })
    }

    addCake() {
      this.newCake.$save();
      this.cakes.splice(0, 0, this.newCake);
      this.newCake = angular.copy(this.initial);
    }

    delete(cake) {
      cake.$remove();
      this.cakes.splice(this.cakes.indexOf(cake), 1);
    }

  }

  angular.module('projectOviApp')
    .component('catalog', {
      templateUrl: 'app/catalog/templates/catalog.html',
      controller: CatalogComponent
    });


})();
