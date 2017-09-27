
goog.provide('pt.navigation.Navigator');

goog.require('goog.events');
goog.require('pt.navigation.NavigationRequest');


/**
 * @constructor
 */
pt.navigation.Navigator = function(a) {
  this.destinationPromises = {};
  this.requestHandlers = [];
  this.node = a;
  goog.events.listen(this, 
      'navigation', this.handleNavigationEvent_, false, this);
};


pt.navigation.Navigator.prototype.detach = function() {
  this.destinationPromises.forEach(function(a, b) {
    a.abort();
  });
  this.destinationPromises = {};
};


pt.navigation.Navigator.prototype.handleNavigationEvent_ = function(e) {
  var b = this.request_(new pt.navigation.NavigationRequest(e.detail));
  b && (e.detail.resultPromise = b, a.stopPropagation());
};


pt.navigation.Navigator.prototype.request_ = function(b) {
  /*
  for (var d = 0; d < this.requestHandlers.length; d++) {
    var e = this.requestHandlers[d];
    var h = e.handler.call(e.context, b);
    if (h instanceof goog.Promise) {
      var k = b.destination;
      (d = a.destinationPromises[k]) && d.abort();
      // TODO: fire
      h = h.then(function() {
        this.node.fire("iron-signal", {
            name: x.navigation.Event.NAVIGATION_COMPLETE,
            data: b
        })
      }
      , null , a);
      this.destinationPromises[k] == 
          h && this.destinationPromises[k] = null;
      a.destinationPromises[k] = h;
      return h;
    }
  }
  return null
  */
};
