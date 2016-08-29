'use strict';
(() => {

  class CheckoutComponent {

    constructor(Cake, Order, ngCart) {
      this.Cake = Cake;
      this.Order = Order;
      this.ngCart = ngCart;
    }

    transferToOrder() {
      console.log(this.ngCart);
    }

  }

  angular.module('projectOviApp')
    .component('checkout', {
      templateUrl: 'app/catalog/templates/checkout.html',
      controller: CheckoutComponent
    });


})();
