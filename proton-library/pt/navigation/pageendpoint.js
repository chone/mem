
goog.provide('pt.navigation.PageEndpoint');


/**
 * @constructor
 */
pt.navigation.PageEndpoint = function(data) {
  pt.navigation.Endpoint.call(this, data);
};
goog.inherits(pt.navigation.PageEndpoint, pt.navigation.Endpoint);


pt.navigation.PageEndpoint.prototype.getPageTitle = function() {
  return '';
};



