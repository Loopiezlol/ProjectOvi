'use strict';

import mongoose from 'mongoose';

var CakeSchema = new mongoose.Schema({
  name: String,
  info: String,
  price: {type: String} 
});

export default mongoose.model('Cake', CakeSchema);
