'use strict';

(function(){
//todo change order id cu invoice id
class OrderComponent {
  constructor(Order, $stateParams, Invoice, Auth) {
    this.Invoice = Invoice;
    this.Order = Order;
    this.Auth = Auth;
    this.order = Order.get({id: $stateParams.id});
  }

  delete(order) {
      order.$remove();
      this.orders.splice(this.orders.indexOf(order), 1);
    }

  test(){
    console.log('consolaa..');
    this.order.name = this.Auth.getCurrentUser.name;
    this.Order.update({ id: this.order._id }, this.order);

  }

  add() {
    
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
  }

    buy(ngCart, $state) {
    var payload = {};
    var wut = {};
    angular.merge(payload, this.ngCart.toObject());
    payload.total = payload.totalCost;
    console.log(payload);
    function go(id){
      
    }

    var a = this.$http.post('/api/orders', payload) //use Order object
        .then(function success (data) {
          
          console.log(data.data._id);
        }, function error (res) {
          //this.errors = res;
        });
        console.log(a);
    //this.ngCart.empty(true);
     //if logged in completed =  /if not create new user on invoiced website
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
