/**
 * Braintree model events
 */

'use strict';

import {EventEmitter} from 'events';
import Braintree from './braintree.model';
var BraintreeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BraintreeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Braintree.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BraintreeEvents.emit(event + ':' + doc._id, doc);
    BraintreeEvents.emit(event, doc);
  }
}

export default BraintreeEvents;
