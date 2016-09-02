
'use strict';

(function() {

class MainController {


  constructor($http, $scope, $document, socket) {
    this.$http = $http;
    this.socket = socket;


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
    var button = document.getElementById('down-arrow');
    var container = angular.element(document.getElementById('container'));
    button.onclick = () => {
      $document.scrollToElement(container, 0, 400);

    }



  }

  $onInit() {
  }
}

angular.module('projectOviApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
