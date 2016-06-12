'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: String
});

export default mongoose.model('Order', OrderSchema);
