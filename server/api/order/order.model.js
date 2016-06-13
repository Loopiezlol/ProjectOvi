'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  buyLater: Boolean,
  orderDate: {type: Date, default: Date.now()},
  items: [{
    quantity: Number,
    cake: {type: mongoose.Schema.Types.ObjectId, ref: 'Cake'}
  }],
  total: Number
  //map here
});

export default mongoose.model('Order', OrderSchema);
