'use strict';

import mongoose from 'mongoose';

var InvoicedSchema = new mongoose.Schema({
  customer: String,
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

export default mongoose.model('Invoice', InvoicedSchema);
