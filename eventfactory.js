var EventFactory = {}

EventFactory.PublishSubscribe = function(args) {
  'use strict';

  this
    .channels = {};

  //Ensure new
  if (!(this instanceof EventFactory.PublishSubscribe)) {
    return new EventFactory.PublishSubscribe();
  }
  
  if (typeof document.createEvent === 'undefined') {
    throw 'createEvent not available';
  }
};

EventFactory.PublishSubscribe.prototype.createChannel = function createChannel(channel, target) {  
  if (typeof this.channels[channel] !== 'undefined') {
    throw 'Channel already exists';
  }
  
  if (typeof target === 'undefined') {
    target = document;
  }

  this.channels[channel] = document.createEvent('Event');
  this.channels[channel].initEvent(channel, true, false);
  this.channels[channel].eventTarget = target;
}

EventFactory.PublishSubscribe.prototype.publish = function publish(channel, message) {
  if (typeof this.channels[channel] !== 'undefined') {
    this.channels[channel].data = message;
    this.channels[channel].eventTarget.dispatchEvent(this.channels[channel]);
  } else {
    throw 'Channel not available';
  }
};

EventFactory.PublishSubscribe.prototype.subscribe = function subscribe(channel, callback) {
  if (typeof this.channels[channel] !== 'undefined') {
    this.channels[channel].eventTarget.addEventListener(channel, callback);
  } else {
    throw 'Channel not available';
  }
};