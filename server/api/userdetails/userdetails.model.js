'use strict';

import mongoose from 'mongoose';

var UserdetailsSchema = new mongoose.Schema({
  _id: {type: String},//delete _id field in production
  //details
  billingAddress: {type: String, default: 'no'},
  shippingAddress: {type: String, default: 'no'},
  isShop: {type: Boolean, default: 0}, //shop
  canDelay: {type: Boolean, default: 0}, //1
  //payment
  invoicedId: {type: String, default: 'no'}, // request // id
  stripeId: {type: String, default: 'no'},
  //checkout
  orderState: {type: String, default: 'cart'},
  order_id: {type: String, default: 'no id'}, //currentOrderId
  allOrders: [{type: String}]
});

export default mongoose.model('Userdetails', UserdetailsSchema);
