var EventFactory = {};

/* Pub Sub */
EventFactory.PublishSubscribe = function (args) {
  'use strict';

  this._channels = {};
  this.EVENT_STOP_PROPOGATION = 'STOPPROPOGATION';

  if (!(this instanceof EventFactory.PublishSubscribe)) {
    return new EventFactory.PublishSubscribe(args);
  }
};

EventFactory.PublishSubscribe.prototype.createChannel = function createChannel(channel) {
  'use strict';

  if (this._channels[channel] !== undefined) {
    throw 'Channel already exists';
  }

  this._channels[channel] = {
    subscribers: [],
    data: null
  };
};

EventFactory.PublishSubscribe.prototype.publish = function publish(channel, message) {
  'use strict';

  var i,
    l;

  if (this._channels[channel] !== undefined) {
    this._channels[channel].data = message;

    for (i = 0, l = this._channels[channel].subscribers.length; i < l; i += 1) {
      if (this._channels[channel].subscribers[i].call(this, message) === this.EVENT_STOP_PROPOGATION) {
        break;
      }
    }
  } else {
    throw 'Channel not available';
  }
};

EventFactory.PublishSubscribe.prototype.subscribe = function subscribe(channel, callback) {
  'use strict';

  if (this._channels[channel] !== undefined) {
    this._channels[channel].subscribers.push(callback);
    return channel + '^^' + (this._channels[channel].subscribers.length -1);
  } else {
    throw 'Channel not available';
  }
};

EventFactory.PublishSubscribe.prototype.unsubscribe = function unsubscribe(callbackId) {
  'use strict';
  var callbackIdComponents = callbackId.split('^^'),
      channel = callbackIdComponents[0],
      subscriberIndex = callbackIdComponents[1];

  if (this._channels[channel] !== undefined && this._channels[channel].subscribers[subscriberIndex] !== undefined) {
    this._channels[channel].subscribers.splice(subscriberIndex, 1);
  } else {
    throw 'Subscription not available';
  }
};

/* Observer */
EventFactory.Observable = {};

EventFactory.Observable.Subject = function Subject(args) {
  'use strict';

  if (!(this instanceof EventFactory.Observable.Subject)) {
    return new EventFactory.Observable.Subject(args);
  }

  this.observers = [];
};


EventFactory.Observable.Subject.prototype.notify = function notify(method) {
  'use strict';

  var i,
    l,
    x,
    xl;

  for (i = 0, l = this.observers.length; i < l; i += 1) {
    if (this.observers[i].listeners[method] !== undefined) {
      for (x = 0, xl = this.observers[i].listeners[method].length; x < xl; x += 1) {
        this.observers[i].listeners[method][x].call(this);
      }
    }
  }
};

EventFactory.Observable.Subject.prototype.attach = function attach(observer) {
  'use strict';

  if (this.observers.indexOf(observer) === -1) {
    this.observers.push(observer);
  }
};

EventFactory.Observable.Subject.prototype.detach = function detach(observer) {
  'use strict';

  var indexOfObserver = this.observers.indexOf(observer);

  if (indexOfObserver === -1) {
    throw 'Unable to locate observer';
  } else {
    this.observers.splice(indexOfObserver, 1);
  }
};

EventFactory.Observable.Observer = function Observer(args) {
  'use strict';

  if (!(this instanceof EventFactory.Observable.Observer)) {
    return new EventFactory.Observable.Observer(args);
  }

  this.listeners = {};
};

EventFactory.Observable.Observer.prototype.addListener = function (method, callback) {
  'use strict';

  if (this.listeners[method] === undefined) {
    this.listeners[method] = [];
  }

  this.listeners[method].push(callback);
};