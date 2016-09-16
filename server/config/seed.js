/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';
import Details from '../api/userdetails/userdetails.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      details: '43217',
      name: 'Test User',
      email: 'test@example.com',
      password: 'parola'
    }, {
      provider: 'local',
      details: '43210',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      provider: 'local',
      details: '43211',
      name: 'Ion',
      email: 'ion@example.com',
      password: 'parola'
    }, {
      provider: 'local',
      details: '43219',
      name: 'Alexandru',
      email: 'alexandru@example.com',
      password: 'parola'
    }, {
      provider: 'local',
      details: '43212',
      name: 'Cristi',
      email: 'cristi@example.com',
      password: 'parola'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Product.find({}).remove()
  .then(() => {
    Product.create({
      name: 'Tort 1',
      imageUrl: '',
      info: 'are castane',
      price: 12
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    }, {
      name: 'Tort 2',
      imageUrl: '',
      info: 'admin',
      price: 6
    })
    .then(() => {
      console.log('finished populating products');
    });
  });

  Details.find({}).remove()
  .then(() => {
    Details.create({
      _id: '43217',
      billingAddress: 'adresaa',
      shippingAddress: 'adrfesss',
      invoicedId:'',
      stripeId: '',
      isShop: 0,
      canDelay: 0,
      activeOrder: ''
    }, {
      _id: '43210',
      billingAddress: 'adresaaa',
      shippingAddress: 'adresaa',
      invoicedId:'',
      stripeId: '',
      isShop: 0,
      canDelay: 0,
      activeOrder: ''
    }, {
      _id: '43211',
      billingAddress: '',
      shippingAddress: '',
      invoicedId:'',
      stripeId: '',
      isShop: 0,
      canDelay: 0,
      activeOrder: ''
    }, {
      _id: '43219',
      billingAddress: '',
      shippingAddress: '',
      invoicedId:'',
      stripeId: '',
      isShop: 0,
      canDelay: 0,
      activeOrder: ''
    }, {
      _id: '43212',
      billingAddress: '',
      shippingAddress: '',
      invoicedId:'',
      stripeId: '',
      isShop: 0,
      canDelay: 0,
      activeOrder: ''
    })
    .then(() => {
      console.log('finished populating details');
    });
  });
