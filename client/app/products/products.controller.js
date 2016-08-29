'use strict';
(function(){

class AllProductsComponent {
  constructor(Product, $state) {
    this.products = Product.query();
    this.Product = Product;
    this.newProduct = new Product();
    this.initial = new Product();
    this.$state = $state;
  }

    go(id) {
      this.$state.go('product', { id: id })
    }

    addProduct() {
      this.newProduct.$save();
      this.products.splice(0, 0, this.newProduct);
      this.newproduct = angular.copy(this.initial);
    }

    delete(product) {
      product.$remove();
      this.products.splice(this.products.indexOf(product), 1);
    }
}

class ProductComponent {
  constructor(Upload, Product, $stateParams, $scope, $timeout) {
    this.Product = Product;

    this.productData = Product.get({id: $stateParams.id});
    this.edit = false;
    this.log = '';
    $scope.upload = this.uploadHandler($scope, Upload, $timeout, $stateParams);
  }
    $onInit() {

    }

    delete(product) {
        product.$remove(() => {
            console.log('Sters');
        });
    }

    changeProduct() {
        this.Product.update({ id: this.productData._id }, this.productData);
        this.edit = false;
    }

    edit() {
        this.edit = !this.edit;
    }

    uploadHandler($scope, Upload, $timeout, $stateParams) {
      return function(file) {
        if (file && !file.$error) {
        //TODO method to delete the previous one from the server (fs.unlink)
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/products/'+ $stateParams.id +'/upload',
        file: file
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0){
          console.log(response.status + ': ' + response.data);
          //errorHandler($scope)(response.status + ': ' + response.data);
          //TODO error handler
        }
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  };
    }
}
  

angular.module('projectOviApp')
  .component('product', {
      templateUrl: 'app/products/templates/product.profile.html',
      controller: ProductComponent
    })

    .component('products', {
      templateUrl: 'app/products/templates/products.html',
      controller: AllProductsComponent
    });

})();
