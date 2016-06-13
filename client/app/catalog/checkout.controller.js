'use strict';
(() => {

  class CheckoutComponent {

    constructor(Cake, ngCart) {
      this.Cake = Cake;

    }

  }

  angular.module('projectOviApp')
    .component('checkout', {
      templateUrl: 'app/catalog/templates/checkout.html',
      controller: CheckoutComponent
    });


})();

