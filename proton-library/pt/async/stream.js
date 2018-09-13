goog.module('pt.async.Stream');

const array = goog.require('goog.array');
const StreamSubscription = goog.require('pt.async.StreamSubscription');

class Stream {

  constructor() {
    this.dataListeners_ = [];
  }

  /**
   * @param {Function} fn
   * @return {hestia.async.StreamSubscription}
   */
  listen(fn) {
    this.dataListeners_.push(fn);
    return new StreamSubscription(this, fn);
  }

  /**
   * @param {Function} fn
   */
  unlisten_(fn) {
    array.remove(this.dataListeners_, fn);
  }

  /**
   * @param {*} data
   */ 
  add_(data) {
    array.forEach(this.dataListeners_, (fn) => {
      setTimeout(() => {
        fn(data);
      }, 0);
    });
  }
}

exports = Stream;
