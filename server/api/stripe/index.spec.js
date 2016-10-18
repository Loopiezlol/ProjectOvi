'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var stripeCtrlStub = {
  index: 'stripeCtrl.index',
  show: 'stripeCtrl.show',
  create: 'stripeCtrl.create',
  upsert: 'stripeCtrl.upsert',
  patch: 'stripeCtrl.patch',
  destroy: 'stripeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var stripeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './stripe.controller': stripeCtrlStub
});

describe('Stripe API Router:', function() {
  it('should return an express router instance', function() {
    expect(stripeIndex).to.equal(routerStub);
  });

  describe('GET /api/stripe', function() {
    it('should route to stripe.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'stripeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/stripe/:id', function() {
    it('should route to stripe.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'stripeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/stripe', function() {
    it('should route to stripe.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'stripeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/stripe/:id', function() {
    it('should route to stripe.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'stripeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/stripe/:id', function() {
    it('should route to stripe.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'stripeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/stripe/:id', function() {
    it('should route to stripe.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'stripeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
