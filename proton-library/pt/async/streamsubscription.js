goog.module('pt.async.StreamSubscription');

class StreamSubscription {

  constructor(stream, fn) {
    this.stream_ = stream;
    this.fn_ = fn;
  }

  /**
   *
   */
  cancel() {
    this.stream_.unlisten_(this.fn_);  
  }
}

exports = StreamSubscription;
