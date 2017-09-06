
goog.provide('pt.navigation.Endpoint');


/**
 * @constructor
 */
pt.navigation.Endpoint = function(a) {
  this.params = this.data = a;
};


pt.navigation.Endpoint.prototype.forContinuation = function(data) {
  // TODO: create request
};


pt.navigation.Endpoint.prototype.coldLoadUrl = function() {
  return null;
};



