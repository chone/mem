
goog.provide('pt.ui.Selectable');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.dom');
goog.require('goog.events.EventType');


/**
 * 创建一个可选择的控件
 * @constructor
 */
pt.ui.Selectable = function(
    cssItem, opt_cssItemSelected) {
  this.items_ = goog.dom.getElementsByClass(cssItem);
  this.cssItemSelected_ = opt_cssItemSelected || 
    goog.getCssName(cssItem, 'selected');
  var selectedItem = goog.dom.getElementByClass(this.cssItemSelected_);
  if (this.items_) {
    goog.array.forEach(this.items_, function(item, index) {
      if (item == selectedItem) {
        this.selectedIndex_ = index;
      }
      goog.events.listen(item, goog.events.EventType.CLICK, function(e) {
        this.setSelectedIndex(index);
      }, false, this);
    }, this);
  }
};


pt.ui.Selectable.prototype.setSelectedIndex = function(index) {
  if (goog.isNumber(this.selectedIndex_)) {
    if (this.selectedIndex_ == index) return;
    goog.dom.classlist.remove(
        this.items_[this.selectedIndex_], this.cssItemSelected_);
  }
  goog.dom.classlist.add(this.items_[index], this.cssItemSelected_);
  this.selectedIndex_ = index;
  return this;
};


pt.ui.Selectable.prototype.getSelectedIndex = function() {
  return this.selectedIndex_;
};
