'use strict';

(function(){

  class OrderComponent {
    constructor($stateParams, Auth, Order, Details, $state, $scope) {
      this.Order = Order;
      this.Auth = Auth;

      this.user = Auth.getCurrentUser();
      this.order = Order.get({id: $stateParams.id});
      this.isLoggedIn = Auth.isLoggedIn();
      if(this.isLoggedIn){this.details = Details.get({id: this.user.details});}

if(this.isLoggedIn){
        this.order.name = this.user.name;
        //this.order.shippingAddress = this.details.shippingAddress;
        //this.order.billingAddress = this.details.billingAddress;
        angular.merge(this.order, this.details); 
        console.log('waaaaat' + this.order.shippingAddress);
      } else {
        console.log('Not');
      }

      this.next = 'info';
    }

    $onInit() {
      if(this.isLoggedIn){
        this.order.name = this.user.name;
        this.order.shippingAddress = this.details.shippingAddress;
        this.order.billingAddress = this.details.billingAddress;
        console.log(this.details);
      } else {
        console.log('Not');
      }
    }

    cancelOrder(order) {
        order.$remove();
    }

    updateDetails() {

    }

    proceed() {
      this.next = 'payment';
    }

    back() {
      this.next = 'info';
    }
  }

  class OrdersComponent {
    constructor(Order, $http) {
      this.orders = Order.query();
      this.Order = Order;
      this.$http = $http;
    }

    cancel() {

    }

    order(order) {
      var payload = {
        order_id: order._id,
        items: order.items,
      };

    }

    delete(order) {
      order.$remove();
        this.orders.splice(this.orders.indexOf(order), 1);
    }
  }

  class CheckoutComponent {
    constructor($http, $state, ngCart, Order, Auth) {
      this.errors = '';

      this.getCurrentUser = Auth.getCurrentUser;

      this.ngCart = ngCart;
      this.$http = $http;
      this.$state = $state;
    }

    $onInit() {
      
    }

    buy() {
      var order = {};

      angular.merge(order, this.ngCart.toObject());
      order.total = order.totalCost;
      console.log(order);

      this.$http.post('/api/orders', order)
          .then((data) => {
            this.$state.go('order', {id: data.data._id});
          }, function error (res) {

          });
      //this.ngCart.empty(true);
      }
  }

  class StripeController {
    constructor($scope, $http, $state, ngCart, Order, Auth) {
      this.payment = {};
      this.user = Auth.getCurrentUser();
    }

    $onInit() {
      
    }

    buy(card) {

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
    })

    .component('order', {
      templateUrl: 'app/orders/templates/order.html',
      controller: OrderComponent
    })

    .controller('StripeController', StripeController);

})();
