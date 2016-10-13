'use strict';

(function () {

  class OrderComponent {
    constructor($stateParams, $http, Auth, Order, Details, $state, $scope, socket, Stripe) {
      //initials
      this.isLoggedIn = Auth.isLoggedIn;
      this.showPayment = 1;
      this.loading = 0;

      //Services
      this.Order = Order;
      this.Auth = Auth;
      this.Details = Details;
      this.Stripe = Stripe;

      this.user = Auth.getCurrentUser();
      this.order = Order.get({ id: $stateParams.id });

      //use populate in production
      if (Auth.isLoggedIn()) {
        Auth.getCurrentUser((user) => {
          this.userDetails = Details.get({ id: user.details }, () => {
            console.log(this.userDetails);
            this.order.shippingAddress = this.userDetails.shippingAddress;
            this.order.billingAddress = this.userDetails.shippingAddress;
            this.order.name = this.user.name;//inside Auth.get.. ?
          });
        });
      }
    }

    $onInit() {

    }

    updateOrder(order) {
      this.Order.update({ id: order._id }, order)
    }

    cancelOrder(order) {
      order.status = 'canceled';
      this.updateOrder(order);
      this.$state.go('catalog');
    }

    /*
var card = {
        cardNumber: '4000056655665556',
        exp_month: '09',
        exp_year: '2018',
        cvc: '518'
      }
    */

    sendCard(card) {// if this.order.name s-a schimbat
      var card = {
        cardNumber: card.cardNumber,
        month: card.exp_month,
        year: card.exp_year,
        cvc: card.cvc
      }
      this.loading = 1;
      this.Stripe.tokenizeCard(card, (token) => {
        console.log('token: ' + token.id);
        var createUser = {
          description: 'sum description',
          //email
          token: token.id
        }
        this.Stripe.createCustomer(createUser, (customer) => {
          console.log('Customer id: ' + customer.id);
          this.loading = 0;
          var charge = {
            amount: this.order.total,
            currency: 'usd',
            customer_id: customer.id,
            description: 'payinguser@dasda.com'
          }
          console.log(charge)
          this.Stripe.charge(charge, (result) => {
            console.log(result);
          })


          return customer.id;
        })

      });
    }

    charge(card) {
      console.log(this.sendCard(card));
      var charge = {
        amount: '1700',
        currency: 'usd',
        customer_id: this.sendCard(card),
        description: 'payinguser@dasda.com'
      }
      console.log(charge)
      this.Stripe.charge(charge, (result) => {
        console.log(result);
      })

    }

    confirm() {
      this.ngCart.empty(true);
      this.showPayment = 1;
    }
  }

  class OrdersComponent {
    constructor(Order, $http) {
      this.$http = $http;

      this.Order = Order;

      this.orders = Order.query();
    }

    delete(order) {
      order.$remove();
      this.orders.splice(this.orders.indexOf(order), 1);
    }
  }

  class CartComponent {
    constructor($http, $state, ngCart, Auth, Details, Order) {
      //tools
      this.$http = $http;
      this.$state = $state;

      //services
      this.Auth = Auth;
      this.Order = Order;
      this.Details = Details;
      this.ngCart = ngCart;

      //initials
      this.errors = '';

      if (Auth.isLoggedIn()) {
        this.user = Auth.getCurrentUser((user) => {
          //this.user = user - order.name = this.Auth.getCurrentUser().name;
          this.userDetails = Details.get({ id: user.details }, () => {
            console.log(this.userDetails);
          });
        });
      }
    }

    $onInit() {

    }

    checkout() {
      var order = {};

      angular.merge(order, this.ngCart.toObject());
      order.total = order.totalCost;
      if (this.Auth.isLoggedIn()) {
        order.name = this.Auth.getCurrentUser().name;
        order.shippingAddress = this.userDetails.shippingAddress;
        order.billingAddress = this.userDetails.billingAddress;
        //angular.merge(order, this.userDetails.toObject());
      }

      this.Order.save(order, (data) => {
        if (this.Auth.isLoggedIn()) {
          //after order is created, update user details  with info state and order id
          this.userDetails.order_id = data._id;
          this.userDetails.orderState = 'order.info';
          console.log(this.userDetails);
          this.Details.update({ id: this.userDetails._id }, this.userDetails);
        }
        console.log(data._id);
        this.$state.go('order.info', { id: data._id });
      });
    }
  }

  class PaymentComponent {
    constructor(Auth, Details) {
      this.payment = {};
      this.user = Auth.getCurrentUser();
    }

    $onInit() {

    }

    buy(card) {

    }

  }

  angular.module('projectOviApp')


    .component('cart', {
      templateUrl: 'app/orders/templates/cart.html',
      controller: CartComponent
    })

    .component('orders', {
      templateUrl: 'app/orders/templates/orders.html',
      controller: OrdersComponent
    })

    .component('order', {
      templateUrl: 'app/orders/templates/order.html',
      controller: OrderComponent
    })

    .component('payment', {
      templateUrl: 'app/orders/templates/payment.html',
      controller: PaymentComponent
    });

})();
