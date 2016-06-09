/**
 * Cake model events
 */

'use strict';

import {EventEmitter} from 'events';
import Cake from './cake.model';
var CakeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CakeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cake.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CakeEvents.emit(event + ':' + doc._id, doc);
    CakeEvents.emit(event, doc);
  }
}

export default CakeEvents;
