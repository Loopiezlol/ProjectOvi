'use strict';
(() => {

class KillacatComponent {
  constructor(Order, socket, $state) {
    this.Order = Order;
    this.orders = [];
    this.newOrder = new Order();
    // this.socket = socket;
    this.$state = $state;
  }

  $onInit() {
    this.orders = this.Order.query();
  }

  go(id) {
    this.$state.go('order', { id: id });
  }

  addOrder(Order) {
    this.newOrder.$save((data) => {
      this.orders = this.Order.query();
      this.newOrder = new this.Order();
      console.log(`Order added`);
    });
  }

  delete(order) {
    order.$remove((data) => {
      this.orders = this.Order.query();
      console.log(`Order deleted`)
    });
  }

}


  angular.module('projectOviApp')
    .component('killacat', {
      templateUrl: 'app/killacat/views/killacat.html',
      controller: KillacatComponent
    });
})();
