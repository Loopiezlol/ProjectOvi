/**
 * Stripe model events
 */

'use strict';

import {EventEmitter} from 'events';
import Stripe from './stripe.model';
var StripeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StripeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Stripe.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StripeEvents.emit(event + ':' + doc._id, doc);
    StripeEvents.emit(event, doc);
  };
}

export default StripeEvents;
