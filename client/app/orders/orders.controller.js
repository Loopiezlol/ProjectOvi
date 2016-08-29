'use strict';
(function(){

class OrdersComponent {
  constructor() {
    this.message = 'Hello';
  }
}

class CheckoutComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('projectOviApp')
  .component('checkout', {
    templateUrl: 'app/orders/templates/checkout.html',
    controller: CheckoutComponent
  })

  .component('orders', {
    templateUrl: 'app/orders/templates/orders.html',
    controller: OrdersComponent
  });

})();
