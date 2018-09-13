goog.module('pt.async.Completer');

const Future = goog.require('pt.async.Future');

class Completer {

  constructor() {
    this.future = new Future((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    });
  }

  /**
   * @param {*}
   */
  complete(value) {
    this.resolve_(value);
  }

  /**
   * @param {Error}
   */
  completeError(e) {
    this.reject_(e);
  }
}

exports = Completer;
