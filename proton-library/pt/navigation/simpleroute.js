
goog.privode('pt.navigation.SimpleRoute');


/**
 * @constructor
 */
pt.navigation.SimpleRoute = function(matchPath, createFunc) {
  this.matchPath_ = matchPath;
  this.createFunc_ = createFunc;
};
goog.inherits(pt.navigation.SimpleRoute, pt.navigation.Route);


pt.navigation.SimpleRoute.prototype.createEndpoint = function(a, b) {
  if (a.length != this.matchPath_.length)
    return null ;
  for (var d = 0; d < a.length; d++) {
    var e = a[d].match(this.matchPath_[d]);
    if (!e || e[0] != a[d])
      return null
  }
  return this.createFunc_(a, b)
};
