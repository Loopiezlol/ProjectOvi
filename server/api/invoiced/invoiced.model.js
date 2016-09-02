'use strict';

import mongoose from 'mongoose';

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

export default mongoose.model('Invoice', InvoicedSchema);
