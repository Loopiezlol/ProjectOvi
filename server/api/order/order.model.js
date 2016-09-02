'use strict';

import mongoose from 'mongoose';

var _ = require('lodash');
var Schema = mongoose.Schema;

var OrderDetailsSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  total: {type: Number, get: getPrice, set: setPrice }
});

var OrderSchema = new Schema({
  // buyer details
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: String,
  billingAddress: String,
  // price details
  items: [OrderDetailsSchema],
  shipping: {type: Number, get: getPrice, set: setPrice, default: 0.0 },
  tax: {type: Number, get: getPrice, set: setPrice, default: 0.0 },
  discount: {type: Number, get: getPrice, set: setPrice, default: 0.0 },
  subTotal: {type: Number, get: getPrice, set: setPrice },
  total: {type: Number, get: getPrice, set: setPrice, required: true },
  // invoiced info
  status: { type: String, default: 'pending' }, // pending, paid/ failed, delivered, canceled, refunded.
  paymentType: { type: String, default: 'Invoiced' },
  invoiceID: String,
  invoicedUserID: String
});
/*
// execute payment
OrderSchema.pre('validate', function (next) {
  if(!this.nonce) { next(); }
  executePayment(this, function (err, result) {
    this.paymentStatus = result;//--
    if(err || !result.success){
      this.status = 'failed. ';// + result.errors + err;
      next(err || result.errors);
    } else {
      this.status = 'paid';//----
      next();
    }
  }.bind(this));
});*/


function executePayment(payment, cb){
  Braintree.transaction.sale({
    amount: payment.total,
    paymentMethodNonce: payment.nonce,
  }, cb);
}

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Order', OrderSchema);