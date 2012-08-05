var EventFactory = {};

/* Pub Sub */
EventFactory.PublishSubscribe = function(args) {
  'use strict';

  this._channels = {};
  this.EVENT_STOP_PROPOGATION = 'STOPPROPOGATION';

  if (!(this instanceof EventFactory.PublishSubscribe)) {
    return new EventFactory.PublishSubscribe(args);
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
};

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

/* Observer */
EventFactory.Observable = {};

EventFactory.Observable.Subject = function Subject(args) {
  if (!(this instanceof EventFactory.Observable.Subject)) {
    return new EventFactory.Observable.Subject(args);
  }
  
  this.observers = [];
};


EventFactory.Observable.Subject.prototype.notify = function notify(method) {
  for (var i = 0, l = this.observers.length; i < l; i += 1) {
    if (typeof(this.observers[i].listeners[method]) !== 'undefined') {
      for (var x = 0, xl = this.observers[i].listeners[method].length; x < xl; x += 1) {
        this.observers[i].listeners[method][x].call(this);
      }
    }
  }
};

EventFactory.Observable.Subject.prototype.attach = function attach(observer) {
  if (this.observers.indexOf(observer) === -1) {
    this.observers.push(observer);
  }
};

EventFactory.Observable.Subject.prototype.detach = function detach(observer) {
  var indexOfObserver = this.observers.indexOf(observer);

  if (indexOfObserver === -1) {
    throw 'Unable to locate observer';
  } else {
    this.observers.splice(indexOfObserver, 1);
  }
};

EventFactory.Observable.Observer = function Observer(args) {
  if (!(this instanceof EventFactory.Observable.Observer)) {
    return new EventFactory.Observable.Observer(args);
  }

  this.listeners = {};
};

EventFactory.Observable.Observer.prototype.addListener = function(method, callback) {
  if (typeof(this.listeners[method]) === 'undefined') {
    this.listeners[method] = [];
  }
  
  this.listeners[method].push(callback);
};