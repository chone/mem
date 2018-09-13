goog.module('pt.async.Future');

const Promise = goog.require('goog.Promise');

/**
 * @param {Function} onError
 */
Promise.prototype.catchError = function(onError) {
  this.thenCatch(onError);
};

exports = Promise;
