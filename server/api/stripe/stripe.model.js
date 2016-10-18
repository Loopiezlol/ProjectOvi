'use strict';

import mongoose from 'mongoose';

var StripeSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Stripe', StripeSchema);
