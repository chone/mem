
goog.provide('pt.navigation.Routes');


/**
 * @constructor
 */
pt.navigation.Routes = function() {
  this.registeredRoutes_ = [];
};


pt.navigation.Routes.prototype.registerRoute = function(route) {
  this.registeredRoutes_.push(route);
};


pt.navigation.Routes.prototype.registerRoutes = function(routes) {
  goog.array.forEach(routes, function(route) {
    this.registerRoute(route);
  }, this);
};
