'use strict';

(function () {

  class OrderComponent {
    constructor($stateParams, $http, $location, $q, Auth, Order, Details, ngCart, $state, $scope, $rootScope, socket, Stripe) {
      //initials
      this.isLoggedIn = Auth.isLoggedIn;
      this.showPayment = 1;
      this.loading = 0;
      this.source = '';
      this.validCard = 0;
      this.hasStripe = 0;
      this.isConfirmed = 0

      //Services
      this.Order = Order;
      this.Auth = Auth;
      this.Details = Details;
      this.Stripe = Stripe;
      this.ngCart = ngCart;

      //
      this.$state = $state;
      this.$scope = $scope;
      this.$q = $q;

      this.order = Order.get({ id: $stateParams.id });

      if (Auth.isLoggedIn()) {
        this.user = Auth.getCurrentUser();
        //use populate in production
        Auth.getCurrentUser((user) => {
          this.userDetails = Details.get({ id: user.details }, (data) => {
            if (this.userDetails.stripeId != 'no') {
              this.source = this.userDetails.stripeId;
              this.hasStripe = 1;
            }
            //let user choose if they wnt to chose different address
            this.order.shippingAddress = this.userDetails.shippingAddress;
            this.order.billingAddress = this.userDetails.shippingAddress;
            this.order.name = this.user.name;

          });
        });
      }
    }

    $onInit() {

    }

    updateOrder(order) {
      this.Order.update({ id: order._id }, order)
    }

    updateUserDetails(details) {
      
    }

    cancelOrder(order) {
      console.log(order);
      order.status = 'canceled';
      this.updateOrder(order);
      this.$state.go('catalog');
    }

    goToPayment(order) {
      this.updateOrder(order);
      this.$state.go('order.payment');
    }

    confirmPayment(order) {
      this.ngCart.empty();
      this.$state.go('order.confirmed');
      //update user details with latest order details
    }

    /*
        Stripe
    */

    asyncTokenize(info) {
      return this.$q((resolve, reject) => {
        var card = {
          cardNumber: info.cardNumber,
          month: info.exp_month,
          year: info.exp_year,
          cvc: info.cvc
        }
        this.Stripe.tokenizeCard(card, (token) => {
          if (token.id) {
            this.validCard = 1;
            resolve(token);
          } else {
            this.paymentStatus = 'Something went wrong';
          }
          resolve(token);
        });
      }, (error) => {
        reject('Something went wrong');
      })
    }

    oneClickPay() {

    }
    
    createSource(card, isCustomer) {
      if (isCustomer) {
        this.asyncTokenize(card).then((data) => {
          console.log(data);
          this.createUser(data.id);
        })
      } else {
        this.asyncTokenize(card).then((data) => {
          this.source = data.id;
        })
      }
    }

    createUser(token) {
      var usr = this.Auth.getCurrentUser();
      var stripeUser = {
        description: 'sum description',
        email: usr.email,
        token: token
      }
      this.Stripe.createCustomer(stripeUser, (customer) => {
        this.source = customer.id;
        if (this.Auth.isLoggedIn()) {
          this.userDetails.stripeId = customer.id;
          this.Details.update({ id: this.userDetails._id }, this.userDetails).$promise.then((details) => {
            console.log(details);
          })
        }
        return customer.id;
      });
    }

    charge(source) {
      if (source.match('cus') != null) {
        var charge = {
          amount: this.order.total,
          currency: 'gbp',
          description: 'payinguser@dasda.com'
        }
        this.Stripe.chargeCustomer({ id: source }, charge, (result) => {
          if (result.status === 'succeeded') {
            console.log(result.status);
            this.order.status = 'succeeded';
            this.confirmPayment();
          } else {
            console.log(result);
          }
        })
      } else if (source.match('tok')) {
        var charge = {
          amount: this.order.total,
          currency: 'gbp',
          source: source,
          description: 'payinguser@dasda.com'
        }
        this.Stripe.chargeCard(charge, (result) => {
          if (result.status === 'succeeded') {
            console.log(result.status);
            this.order.status = 'succeeded';
            this.confirmPayment();
          } else {
            console.log(result);
          }
        })
      }

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
          this.userDetails = Details.get({ id: user.details }, () => {
            //console.log(this.userDetails);
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
      }

      this.Order.save(order, (data) => {
        if (this.Auth.isLoggedIn()) {
          //after order is created, update user details  with info state and order id
          this.userDetails.orderState = 'order.info';
          this.userDetails.order_id = data._id;
          this.Details.update({ id: this.userDetails._id }, this.userDetails).$promise.then((data) => {
          });
        }
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

    .filter('yesNo', function () {
      return function (boolean) {
        return boolean ? 'Yes' : 'No';
      }
    })

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
