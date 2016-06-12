'use strict'

class OrderController {

  constructor(Order, $state, $stateParams) {
    this.Order = Order;
    this.$state = $state;
    this.orderData = Order.get({ id: $stateParams.id});
    this.edit = false;
  }

  delete(order) {
    order.$remove(() => {
      console.log('Sters');
      this.orders = Order.query();
    });
  }

  changeCake() {
    this.Order.update({ id: this.orderData._id }, this.orderData);
    this.edit = false;
  }

  edit() {
    htis.edit = !this.edit
  }
}

angular.module('projectOviApp')
    .controller('OrderController', OrderController);
