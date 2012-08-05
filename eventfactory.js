var EventFactory = {}

EventFactory.PublishSubscribe = function(args) {
  'use strict';

  this._channels = {};
  this.EVENT_STOP_PROPOGATION = 'STOPPROPOGATION';

  //Ensure new
  if (!(this instanceof EventFactory.PublishSubscribe)) {
    return new EventFactory.PublishSubscribe();
  }
  
  if (typeof document.createEvent === 'undefined') {
    throw 'createEvent not available';
  }
};

EventFactory.PublishSubscribe.prototype.createChannel = function createChannel(channel) {  
  if (typeof this._channels[channel] !== 'undefined') {
    throw 'Channel already exists';
  }
  
  if (typeof target === 'undefined') {
    target = document;
  }

  this._channels[channel] = {
    subscribers: [],
    data: null
  }
}

EventFactory.PublishSubscribe.prototype.publish = function publish(channel, message) {
  if (typeof this._channels[channel] !== 'undefined') {
    this._channels[channel].data = message;
    
    for(var i = 0, l = this._channels[channel].subscribers.length; i < l; i += 1) {
      if (this._channels[channel].subscribers[i].call(this, message) === this.EVENT_STOP_PROPOGATION) {
        break;
      }
    }
  } else {
    throw 'Channel not available';
  }
};

EventFactory.PublishSubscribe.prototype.subscribe = function subscribe(channel, callback) {
  if (typeof this._channels[channel] !== 'undefined') {
    this._channels[channel].subscribers.push(callback);
  } else {
    throw 'Channel not available';
  }
};