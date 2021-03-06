
goog.provide('pt.ui.Component');

goog.require('goog.ui.Component');
goog.require('goog.object');


/**
 * @constructor
 */
pt.ui.Component = function(opt_arg1) {
  var domHelper;
  var className;
  var text;
  var html;
  if (opt_arg1 instanceof goog.dom.DomHelper) {
    domHelper = opt_arg1;
  } else if (goog.isString(opt_arg1)) {
    className = opt_arg1;
  } else if (goog.isObject(opt_arg1)) {
    domHelper = opt_arg1.dom; 
    className = opt_arg1.css;
    text = opt_arg1.text;
    html = opt_arg1.html;
  }
  pt.ui.Component.base(this, 'constructor', domHelper);
  this.className_ = className;
  this.text_ = text;
  this.html_ = html;
  this.$ = {};
  this._ = {};
};
goog.inherits(pt.ui.Component, goog.ui.Component);


/** @override */
pt.ui.Component.prototype.createDom = function() {
  this.setElementInternal(this.getDomHelper().createDom(
      goog.dom.TagName.DIV, {
    className: this.className_,
    innerHTML: this.html_ || this.text_ || ''
  }));
};


/** @override */
pt.ui.Component.prototype.disposeInternal = function() {
  pt.ui.Component.base(this, 'disposeInternal');
  this.className_ = null;
  this.text_ = null;
  this.html_ = null;
  goog.object.forEach(this.$, function(elem) {
    goog.dom.removeNode(elem);
  });
  goog.object.clear(this.$);
  this.$ = null;
  this._ = null;
};


