'use strict';

import mongoose from 'mongoose';

var UserdetailsSchema = new mongoose.Schema({
  _id: {type: String, default: '4343'},
  billingAddress: String,
  shippingAddress: String,
  invoicedId:{type: String, default: 'no'}, // request // id
  stripeId: {type: String, default: 'no'},
  isShop:{type: Boolean, default: 0}, //shop
  canDelay:{type: Boolean, default: 0}, //1
  activeOrder:{type: String, default: 'no'}
});

export default mongoose.model('Userdetails', UserdetailsSchema);
