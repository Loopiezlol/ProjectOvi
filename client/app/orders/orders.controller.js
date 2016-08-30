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
    controller: 'ProductCheckoutCtrl'  //CheckoutComponent
  })

  .component('orders', {
    templateUrl: 'app/orders/templates/orders.html',
    controller: OrdersComponent
  })

  .constant('clientTokenPath', '/api/braintree/client_token')

  .controller('ProductCheckoutCtrl',
  function($scope, $http, $state, ngCart){
  $scope.errors = '';

  $scope.paymentOptions = {
    onPaymentMethodReceived: function(payload) {
      angular.merge(payload, ngCart.toObject());
      payload.total = payload.totalCost;
      console.error(payload);
      $http.post('/api/orders', payload)
      .then(function success () {
        ngCart.empty(true);
        $state.go('products');
      }, function error (res) {
        $scope.errors = res;
      });
    }
  };
});

})();
