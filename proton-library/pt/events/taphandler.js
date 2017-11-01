goog.provide('pt.events.TapHandler');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @param {Element} element
 * @extends {goog.events.EventTarget}
 */
pt.events.TapHandler = function(element) {
  goog.events.EventTarget.call(this);

  this.element_ = element;

  goog.events.listen(element, 
    goog.events.EventType.TOUCHSTART, this.handleTouchStart_, false, this);

  goog.events.listen(element, 
    goog.events.EventType.TOUCHEND, this.handleTouchEnd_, false, this);

  goog.events.listen(element, 
    goog.events.EventType.TOUCHMOVE, this.handleTouchMove_, false, this);
};
goog.inherits(pt.events.TapHandler, goog.events.EventTarget);


pt.events.TapHandler.EventType = {
  TAP: 'tap'
};

/**
 * @private
 */
pt.events.TapHandler.prototype.handleTouchStart_ = function(e) {
  this.x_ = e.clientX;
  this.y_ = e.clientY;
  this.target_ = e.target;
  this.startTime_ = (new Date()).getTime();
};


/**
 * @private
 */
pt.events.TapHandler.prototype.handleTouchEnd_ = function(e) {
  this.endTime_ = (new Date()).getTime();
  if(this.endTime_ - this.startTime_ < 200){
    var offsetX = this.x_ - e.clientX;
    var offsetY = this.y_ - e.clientY;
    if (Math.abs(offsetX) < 4 && Math.abs(offsetY) < 4) {
      e.preventDefault();
      e.type = pt.TapHandler.EventType.TAP;
      this.dispatchEvent(e);
    }
    this.x_ = 0;
    this.y_ = 0;
  }
};


/**
 * @private
 */
pt.events.TapHandler.prototype.handleTouchMove_ = function(e) {
  this.x_ = e.clientX;
  this.y_ = e.clientY;
};


