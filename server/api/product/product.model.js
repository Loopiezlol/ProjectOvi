'use strict';

import mongoose from 'mongoose';

var ProductSchema = new mongoose.Schema({
  name: String,
  info: String,
  price: {type: String},
  imageBin: {data: Buffer, contentType: String},
  imageUrl: String
});

export default mongoose.model('Product', ProductSchema);
