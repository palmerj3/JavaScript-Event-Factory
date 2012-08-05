JavaScript-Event-Factory
============================

A pure JavaScript messaging system that will provide the most common messaging patterns such as Pub/Sub and Observer.

This is currently in development, so use at your own risk.

Pub/Sub Example:

```
function() {
  var pubsub = new EventFactory.PublishSubscribe();
  pubsub.createChannel('test');

  pubsub.subscribe('test', function(msg) {
    alert(msg);

    //return pubsub.EVENT_STOP_PROPOGATION;
  });

  pubsub.subscribe('test', function(msg) {
    // Uncomment "return pubsub.EVENT_STOP_PROPOGATION" to see
    alert('This message should be blocked');
  });

  pubsub.publish('test', 'Hello world!');
}();
```