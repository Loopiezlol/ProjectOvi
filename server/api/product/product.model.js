'use strict';

import mongoose from 'mongoose';

var ProductSchema = new mongoose.Schema({
  name: String,
  info: String,
  price: {type: String, default: 0},
  imageBin: {data: Buffer, contentType: String},
  imageUrl: [{type: String}]
});

export default mongoose.model('Product', ProductSchema);
