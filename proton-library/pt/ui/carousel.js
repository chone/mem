
goog.provide('pt.ui.Carousel');

goog.require('goog.ui.Component');
goog.require('goog.dom.classlist');
goog.require('goog.array');
goog.require('goog.Timer');

/**
 * @constructor
 */
pt.ui.Carousel = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
  this.autoplayTimer_ = new goog.Timer(3 * 1000);
};
goog.inherits(pt.ui.Carousel, goog.ui.Component);


pt.ui.Carousel.prototype.items_;


pt.ui.Carousel.prototype.indicators_;


pt.ui.Carousel.CSS_CLASS = goog.getCssName('pt-carousel');


pt.ui.Carousel.prototype.activeIndex_ = 0;


pt.ui.Carousel.prototype.autoplayTimer_;


pt.ui.Carousel.prototype.autoplay_ = false;


pt.ui.Carousel.prototype.setAutoplayInterval = function(interval) {
  this.autoplayTimer_.setInterval(interval);
  return this;
};


/** @override */
pt.ui.Carousel.prototype.enterDocument = function() {
  goog.ui.Component.prototype.enterDocument.call(this);
  var handler = this.getHandler();
  handler
    .listen(this.autoplayTimer_, 
        goog.Timer.TICK, this.handleTick)
    .listen(this.getElement(), 
        goog.events.EventType.MOUSEOVER, this.handleEnter)
    .listen(this.getElement(),
        goog.events.EventType.MOUSELEAVE, this.handleLeave);

  goog.array.forEach(this.indicators_, function(indicator, index) {
    self = this;
    handler.listen(indicator,
      goog.events.EventType.MOUSEOVER, function() {
        self.setActiveIndex(index);
      });
  }, this);

  if (this.autoplay_) {
    this.autoplayTimer_.start();
  }
};


/** @override */
pt.ui.Carousel.prototype.decorateInternal = function(element) {
  goog.ui.Component.prototype.decorateInternal.call(this, element);
  this.items_ = this.getElementsByClass(
      goog.getCssName(pt.ui.Carousel.CSS_CLASS, 'item'));
  this.indicators_ = this.getElementsByClass(
      goog.getCssName(pt.ui.Carousel.CSS_CLASS, 'indicator'));
  var activeClass = goog.getCssName(
      pt.ui.Carousel.CSS_CLASS, 'item-active');
  var hasActiveItem = false;
  goog.array.forEach(this.items_, function(item, index) {
    if (goog.dom.classlist.contains(item, activeClass)) {
      this.activeIndex_ = index;
      hasActiveItem = true;
    }
  }, this);
  if (!hasActiveItem) {
    goog.dom.classlist.add(this.items_[0], activeClass);
  }

  var activeIndicatorClass = goog.getCssName(
      pt.ui.Carousel.CSS_CLASS, 'indicator-active');
  var hasActiveIndicator = goog.array.some(this.indicators_, 
      function(item, index) {
    if (goog.dom.classlist.contains(item, activeIndicatorClass)) {
      return true;
    }
  });  
  if (!hasActiveIndicator) {
    goog.dom.classlist.add(this.indicators_[0], activeIndicatorClass);
  }
};



pt.ui.Carousel.prototype.handleTick = function(e) {
  this.next();
};


pt.ui.Carousel.prototype.handleEnter = function() {
  if (this.autoplay_) {
    this.autoplayTimer_.stop();
  }
};


pt.ui.Carousel.prototype.handleLeave = function() {
  if (this.autoplay_) {
    this.autoplayTimer_.start();
  }
};


/**
 *
 */
pt.ui.Carousel.prototype.setAutoplay = function(autoplay) {
  if (this.isInDocument()) {
    if (autoplay) {
      this.autoplayTimer_.start();
    } else {
      this.autoplayTimer_.stop();
    }
  }
  this.autoplay_ = autoplay;
  return this;
};


pt.ui.Carousel.prototype.setActiveIndex = function(index) {
  this.autoplayTimer_.stop();
  this.updateStyle_(index);
  this.activeIndex_ = index;
  this.autoplayTimer_.start();
  return true;
};


/**
 *
 */
pt.ui.Carousel.prototype.next = function() {
  var activeIndex = (this.activeIndex_ + 1) % this.items_.length;
  this.setActiveIndex(activeIndex);
  return this;
};


/**
 *
 */
pt.ui.Carousel.prototype.previous = function() {
  var activeIndex = (this.activeIndex_ - 1);
  if (activeIndex < 0) {
    activeIndex = this.items_.length - 1;
  }
  this.setActiveIndex(activeIndex);
  return this;
};


/**
 *
 */
pt.ui.Carousel.prototype.updateStyle_ = function(activeIndex) {
  var itemActiveClass = 
      goog.getCssName(pt.ui.Carousel.CSS_CLASS, 'item-active');
  var indicatorActiveClass = 
      goog.getCssName(pt.ui.Carousel.CSS_CLASS, 'indicator-active');
  goog.dom.classlist.remove(
      this.items_[this.activeIndex_], itemActiveClass);
  goog.dom.classlist.remove(
      this.indicators_[this.activeIndex_], indicatorActiveClass); 
  goog.dom.classlist.add(
      this.items_[activeIndex], itemActiveClass);
  goog.dom.classlist.add(
      this.indicators_[activeIndex], indicatorActiveClass); 
};


