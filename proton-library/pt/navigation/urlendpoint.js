
goog.provide('pt.navigation.UrlEndpoint');


/**
 * @constructor
 */
pt.navigation.UrlEndpoint = function(data) {
  pt.navigation.Endpoint.call(this, data);
};
goog.inherits(pt.navigation.UrlEndpoint, pt.navigation.Endpoint);


pt.navigation.UrlEndpoint.prototype.coldLoadUrl = function() {
  return this.data.url;
};
