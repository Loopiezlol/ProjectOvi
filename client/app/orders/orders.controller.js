'use strict';

(function(){

class OrderComponent {
  constructor(Order, $stateParams) {
    this.message = 'Hello';
    this.order = Order.get({id: $stateParams.id});
  }

  delete(order) {
      order.$remove();
      this.orders.splice(this.orders.indexOf(order), 1);
    }
}

class OrdersComponent {
  constructor(Order, $http) {
    this.message = 'Hello';
    this.orders = Order.query();
    this.Order = Order;
    this.$http = $http;
  }

  order(order) {
/*
    var items= [{
    name: 'String',
    quantity: 3,
    unit_cost: 3
  }];
    for(var i=0;i<order.items.length; i++) {
       
      
   items[i].name = order.items[i]._id;
   items[i].unit_cost = order.items[i].total / order.items[i].quantity;
   items[i].quantity = order.items[i].quantity;
 }*/
    
    var payload = {
      order_id: order._id,
      items: order.items,
    }
    this.$http.post('/api/invoiced/invoices/49231', payload)
        .then(function success (data) {
          order.status = 'invvoiced';
          console.log(data.data._id);
        }, function error (res) {
          //this.errors = res;
        });
  }

  delete(order) {
      order.$remove();
      this.orders.splice(this.orders.indexOf(order), 1);
    }
}

class CheckoutComponent {
  constructor($scope, $http, $state, ngCart, Order) {//--
    this.errors = '';
    this.ngCart = ngCart;
    this.$http = $http;
    this.$state = $state;
    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  }

    buy(ngCart) {
    var payload = {};
    var wut = {};
    angular.merge(payload, this.ngCart.toObject());
    payload.total = payload.totalCost;
    console.log(payload);
    this.$http.post('/api/orders', payload)
        .then(function success (data) {
          wut = angular.toJson(data);
          console.log(data.data._id);
        }, function error (res) {
          //this.errors = res;
        });
    this.ngCart.empty(true);
    this.$state.go('orders');
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
  });

})();
