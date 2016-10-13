'use strict';

import mongoose from 'mongoose';
import https from 'https';
import http from 'http';



var _ = require('lodash');
var Schema = mongoose.Schema;

var InvoicedSchema = new mongoose.Schema({
  customer: {type: String, default: '49231'},
  payment_terms: {type: String, default: 'NET 14'},
  items: [{
    name: String,
    quantity: Number,
    unit_cost: Number
  }],
  taxes: [{
    amount: Number
  }]
});


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
  // payment info
  dueDate: {type: Date, default: Date.now()},
  status: { type: String, default: 'pending' }, // pending/failed/received/canceled/refunded
  paymentType: { type: String, default: 'Invoiced' }, //Stripe
  invoicedId: String,
  stripeId: String
});

OrderSchema.methods = {
  invoice() {
    concole.log('aaaaaaaa');
  }
};

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Order', OrderSchema);