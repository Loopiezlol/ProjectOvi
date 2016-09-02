/**
 * Invoiced model events
 */

'use strict';

import {EventEmitter} from 'events';
import Invoiced from './invoiced.model';
var InvoicedEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InvoicedEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Invoiced.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InvoicedEvents.emit(event + ':' + doc._id, doc);
    InvoicedEvents.emit(event, doc);
  }
}

export default InvoicedEvents;
