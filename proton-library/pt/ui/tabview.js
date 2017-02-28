
goog.provide('pt.ui.TabView');

goog.require('goog.ui.Component');


/**
 * @constructor
 */
pt.ui.TabView = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);
};
goog.inherits(pt.ui.TabView, goog.ui.Component);


pt.ui.TabView.CSS_CLASS = goog.getCssName('pt-tabview');


pt.ui.TabView.prototype.tabs_;


pt.ui.TabView.prototype.pages_;


pt.ui.TabView.prototype.selectedIndex_ = 0;


/** @override */
pt.ui.TabView.prototype.decorateInternal = function(element) {
  goog.ui.Component.prototype.decorateInternal.call(this, element);
  this.tabs_ = this.getElementsByClass(
      goog.getCssName(pt.ui.TabView.CSS_CLASS, 'tab'));
  this.pages_ = this.getElementsByClass(
      goog.getCssName(pt.ui.TabView.CSS_CLASS, 'page'));
  var hasTabSelected = false;
  var tabSelectedClass = goog.getCssName(
      pt.ui.TabView.CSS_CLASS, 'tab-selected');
  goog.array.forEach(this.tabs_, function(tab, index) {
    if (goog.dom.classlist.contains(tab, tabSelectedClass)) {
      this.selectedIndex_ = index;
      hasTabSelected = true;
    }
  }, this);
};


/** @override */
pt.ui.TabView.prototype.enterDocument = function() {
  goog.ui.Component.prototype.enterDocument.call(this);
  var handler = this.getHandler();
  goog.array.forEach(this.tabs_, function(tab, index) {
    var self = this;
    handler.listen(tab, goog.events.EventType.CLICK, function() {
      self.setSelectedIndex(index);
    });
  }, this);
};


pt.ui.TabView.prototype.setSelectedIndex = function(index) {
  this.updateStyle_(index);
  this.selectedIndex_ = index;
};


pt.ui.TabView.prototype.updateStyle_ = function(index) {
  var tabSelectedClass = goog.getCssName(
      pt.ui.TabView.CSS_CLASS, 'tab-selected');
  var pageSelectedClass = goog.getCssName(
      pt.ui.TabView.CSS_CLASS, 'page-selected');
  goog.dom.classlist.remove(
      this.tabs_[this.selectedIndex_], tabSelectedClass);
  goog.dom.classlist.remove(
      this.pages_[this.selectedIndex_], pageSelectedClass);
  goog.dom.classlist.add(
      this.tabs_[index], tabSelectedClass);
  goog.dom.classlist.add(
      this.pages_[index], pageSelectedClass);
};

