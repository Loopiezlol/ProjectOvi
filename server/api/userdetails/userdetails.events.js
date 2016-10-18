/**
 * Userdetails model events
 */

'use strict';

import {EventEmitter} from 'events';
import Userdetails from './userdetails.model';
var UserdetailsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserdetailsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Userdetails.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UserdetailsEvents.emit(event + ':' + doc._id, doc);
    UserdetailsEvents.emit(event, doc);
  };
}

export default UserdetailsEvents;
