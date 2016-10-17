'use strict';
(function () {

  class AllProductsComponent {
    constructor(Product, $state, $scope, Upload, $timeout, $location, $stateParams, socket, Lightbox) {
      //services
      this.Product = Product;
      this.Lightbox = Lightbox;
      this.Upload = Upload;

      //initials
      this.initial = new Product();
      this.images = [];
      this.product = '';
      this.showForm = 0;
      this.create = 0;
      this.edit = 0;

      //
      this.$state = $state;

      //tools
      this.socket = socket;
      this.$state = $state;
      this.$location = $location;
      this.$scope = $scope;

      //products querry
      this.products = Product.query(() => {
        this.socket.syncUpdates('product', this.products);
      });
    }

    editProduct(product) {
      console.log(product);
      this.showForm = 1;
      this.edit = 1;
      this.product = angular.copy(product);
      this.images = [];
      angular.forEach(product.imageUrl, (url) => {
        var modal = {
          'url': url,
          'thumbUrl': url
        }
        this.images.push(modal);
      });
      
    }

    newProduct() {
      this.showForm = 1
      this.create = 1;
      this.product = {
        name: 'Create a title',
        info: 'Create a subtitle',
        price: 0
      }
      this.images = [];
      this.Product.save(this.product, (data) => {
        this.product = angular.copy(data);
        console.log(this.product);
      });
    }

    discardProduct(product) {
      this.showForm = 0;
      this.create = 0;
      this.edit = 0;
      this.deleteProduct(product);
    }

    updateProduct(product) {
      this.Product.update({ id: product._id }, product);
      this.showForm = 0;
      this.create = 0;
      this.edit = 0;
    }

    cancelActions() {
      this.showForm = 0;
      this.create = 0;
      this.edit = 0;
    }

    addProduct(product) {
      this.Product.save(product);
      this.product = angular.copy(this.initial);
    }

    deleteProduct(product) {
      this.Product.remove({ id: product._id });
    }

    openLightboxModal(index) {
      this.Lightbox.openModal(this.images, index);
    }

    uploadHandler(file) {
      if (file && !file.$error) {
        this.$scope.file = file;
        file.upload = this.Upload.upload({
          url: '/api/products/' + this.product._id + '/upload',
          file: file
        });

        file.upload.then((response) => {
          console.log(response.data);
          var modal = {
            'url': response.data,
            'thumbUrl': response.data
          }
          this.images.push(modal);
        }, (response) => {
          console.log(response);
          if (response.status > 0) {
            console.log(response.status + ': ' + response.data);
          }
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    }
  }

  class ProductComponent {
    constructor(Upload, Product, $stateParams, $scope, $timeout) {
      this.Product = Product;

      this.productData = Product.get({ id: $stateParams.id });
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
      return function (file) {
        if (file && !file.$error) {
          //TODO method to delete the previous one from the server (fs.unlink)
          $scope.file = file;
          file.upload = Upload.upload({
            url: '/api/products/' + $stateParams.id + '/upload',
            file: file
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
            });
          }, function (response) {
            if (response.status > 0) {
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
