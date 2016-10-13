'use strict';
const angular = require('angular');

/*@ngInject*/
export function InvoicedService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('projectOviApp', [])
  .service('Invoiced', InvoicedService)
  .name;
