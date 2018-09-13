goog.module('pt.async.StreamController');

const Stream = goog.require('pt.async.Stream');

class StreamController {

  constructor() {
    this.stream = new Stream();
  }

  add(data) {
    this.stream.add_(data);
  }
}

exports = StreamController;
