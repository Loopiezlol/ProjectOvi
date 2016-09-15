'use strict';

(function(){
//todo change order id cu invoice id
class OrderComponent {
  constructor($stateParams, Invoice, Auth, Order, $state, $scope) {
    this.Order = Order;
    this.Auth = Auth;
    this.order = Order.get({id: $stateParams.id});
    this.next = 'info';
    this.user = Auth.getCurrentUser();
    this.isLoggedIn = Auth.isLoggedIn();    //if(Auth.isLoggedIn()){
      if(this.isLoggedIn){
      this.order.name = this.user.name;
      this.order.shippingAddress = this.user.shippingAddress;
      this.order.billingAddress = this.user.billingAddress;
    } else {
      console.log('Not');
    }
    this.totalItems = 64;
    this.currentPage = 4
  }

  cancelOrder(order) {
      order.$remove();
    }

   proceed() {
     this.next = 'payment';
     if(this.user){//check if undefined
      console.log(this.user);
      this.order.name = this.user.name;
      this.order.shippingAddress = this.user.shippingAddress;
      this.order.billingAddress = this.user.billingAddress;
      console.log('sac' +this.user.shippingAddress); //de asemenea daca are invoiced pun invoice user id //la save daca are invoiced id salvez si la order codu invoice-ului respectiv
    } else {
      console.log('Not');
    }
    //this.$state.transitionTo('order.list');
   }

   back() {
     this.next = 'info';
    //this.$state.transitionTo('order.list');
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
    };
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

//this.$state.go('order', {id: data.data_id});
class CheckoutComponent {
  constructor($scope, $http, $state, ngCart, Order) {//--
    this.errors = '';
    this.ngCart = ngCart;
    this.$http = $http;
    this.$state = $state;
  }

  $onInit() {
    
  }

    buy(ngCart, $state) {
    var payload = {};
    var wut = {};
    angular.merge(payload, this.ngCart.toObject());
    payload.total = payload.totalCost;
    console.log(payload);

    this.$http.post('/api/orders', payload) //use Order object
        .then((data) => {
          this.$state.go('order', {id: data.data._id});
        }, function error (res) {
          //this.errors = res;
        });
    //this.ngCart.empty(true);
     //if logged in completed =  /if not create new user on invoiced website
  }

}

//----------------
//Stripe.setPublishableKey('pk_test_RtMJXSo27JWwzVBUCUbzwcwx');
//modules: angular-payments



class StripeController {
  constructor($scope, $http, $state, ngCart, Order) {
    $scope.handleStripe = function(status, response){
        if(response.error) {
          // there was an error. Fix it.
        } else {
          // got stripe token, now charge it or smt
          token = response.id
        }
      }
  }

  $onInit() {
    
  }

    buy(ngCart, $state) {

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
