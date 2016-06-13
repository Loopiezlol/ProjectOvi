'use strict';

import mongoose from 'mongoose';

var CakeSchema = new mongoose.Schema({
  name: String,
  info: String,
  price: {type: String},
  imageBin: {data: Buffer, contentType: String},
  imageUrl: String
});

export default mongoose.model('Cake', CakeSchema);
