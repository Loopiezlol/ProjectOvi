'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var invoicedCtrlStub = {
  index: 'invoicedCtrl.index',
  show: 'invoicedCtrl.show',
  create: 'invoicedCtrl.create',
  update: 'invoicedCtrl.update',
  destroy: 'invoicedCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var invoicedIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './invoiced.controller': invoicedCtrlStub
});

describe('Invoiced API Router:', function() {

  it('should return an express router instance', function() {
    expect(invoicedIndex).to.equal(routerStub);
  });

  describe('GET /api/invoiced', function() {

    it('should route to invoiced.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'invoicedCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/invoiced/:id', function() {

    it('should route to invoiced.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'invoicedCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/invoiced', function() {

    it('should route to invoiced.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'invoicedCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/invoiced/:id', function() {

    it('should route to invoiced.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'invoicedCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/invoiced/:id', function() {

    it('should route to invoiced.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'invoicedCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/invoiced/:id', function() {

    it('should route to invoiced.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'invoicedCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
