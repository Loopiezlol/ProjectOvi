'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userdetailsCtrlStub = {
  index: 'userdetailsCtrl.index',
  show: 'userdetailsCtrl.show',
  create: 'userdetailsCtrl.create',
  upsert: 'userdetailsCtrl.upsert',
  patch: 'userdetailsCtrl.patch',
  destroy: 'userdetailsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userdetailsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './userdetails.controller': userdetailsCtrlStub
});

describe('Userdetails API Router:', function() {
  it('should return an express router instance', function() {
    expect(userdetailsIndex).to.equal(routerStub);
  });

  describe('GET /api/userdetails', function() {
    it('should route to userdetails.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'userdetailsCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/userdetails/:id', function() {
    it('should route to userdetails.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'userdetailsCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/userdetails', function() {
    it('should route to userdetails.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userdetailsCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/userdetails/:id', function() {
    it('should route to userdetails.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'userdetailsCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/userdetails/:id', function() {
    it('should route to userdetails.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'userdetailsCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/userdetails/:id', function() {
    it('should route to userdetails.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'userdetailsCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
