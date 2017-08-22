
goog.module('paper.Toast');


var Control = goog.require('goog.ui.Control');
var classlist = goog.require('goog.dom.classlist');
var ControlRenderer = goog.require('goog.ui.ControlRenderer');
var State = goog.require('goog.ui.Component.State');
var soy = goog.require('goog.soy');
var paper = goog.require('paper');


var Toast = goog.defineClass(Control, {


    statics: {
      currentToast: null
    },


    constructor: function(opt_content) {
      Toast.base(this, 'constructor', opt_content, 
        ControlRenderer.getCustomRenderer(
          ControlRenderer, this.getCssClass()));
      this.duration_ = 3000;
      this.autoCloseTimer_ = null;
      this.fitBottom_ = false;
      this.capsule_ = false;

      this.setSupportedState(State.DISABLED, false);
      this.setSupportedState(State.HOVER, false);
      this.setSupportedState(State.ACTIVE, false);
      this.setSupportedState(State.FOCUSED, false);
      this.setSupportedState(State.OPENED, true);
    },


    getCssClass: function() {
      return goog.getCssName('paper-toast');
    },


    setDuration: function(duration) {
      this.duration_ = duration;
      return this;
    },


    setFitBottom: function(bool) {
      if (this.fitBottom_ == bool) return;
      if (this.isInDocument()) {
        classlist.enable(this.getElement(), 
          goog.getCssName(this.getCssClass(), 'fit-bottom'), bool);
      }
      this.fitBottom_ = bool;
      return this;
    },


    getFitBottom: function() {
      return this.fitBottom_;
    },


    setCapsule: function(bool) {
      if (this.capsule_ == bool) return;
      if (this.isInDocument()) {
        classlist.enable(this.getElement(), 
          goog.getCssName(this.getCssClass(), 'capsule'), bool);
      }
      this.capsule_ = bool;
      return this;
    },


    getCapsule: function() {
      return this.capsule_;
    },


    getDuration: function(duration) {
      return this.duration_;
    },


    /** @override */
    createDom: function() {
      Toast.base(this, 'createDom');
      var element = this.getElement();
      if (this.fitBottom_) {
        classlist.add(element, 
          goog.getCssName(this.getCssClass(), 'fit-bottom'));
      }
      if (this.capsule_) {
        classlist.add(element, 
          goog.getCssName(this.getCssClass(), 'capsule'));
      }
    },


    /** @override */
    enterDocument: function() {
      Toast.base(this, 'enterDocument');
      if (this.isOpen()) {
        this.openedChanged_();
      }
    },


    /** @override */
    setOpen: function(opened) {
      if (this.isOpen() == opened) return;
      Toast.base(this, 'setOpen', opened);
      if (this.isInDocument()) {
        this.openedChanged_();
      }
      return this;
    },


    setContent: function(content) {
      Toast.base(this, 'setContent', content);
      return this;
    },


    openedChanged_: function() {
      var opened = this.isOpen();
      if (this.autoCloseTimer_ != null) {
        clearTimeout(this.autoCloseTimer_);
        this.autoCloseTimer_ = null;
      }
      if (opened) {
        if (Toast.currentToast && Toast.currentToast !== this) {
          Toast.currentToast.setOpen(false);
        }
        Toast.currentToast = this;
        if (this.canAutoClose_()) {
          this.autoCloseTimer_ = setTimeout(goog.bind(function() {
            this.setOpen(false);
          }, this), this.duration_);
        }
      } else if (Toast.currentToast === this) {
        Toast.currentToast = null;
      }
    },


    canAutoClose_: function() {
      return this.duration_ > 0 && this.duration_ !== Infinity;
    },


    show: function(options) {
      if (goog.isString(options)) {
        this.setContent(options);
      } else if (goog.isObject(options)) {
        if (options.content) {
          this.setContent(options.content);
        }
        if (goog.isNumber(options.duration)) {
          this.setDuration(options.duration);
        }
      }
      this.setOpen(true);
      return this;
    },


    hide: function() {
      this.setOpen(false);
      return this;
    },


    /** @override */
    disposeInternal: function() {
      Toast.base(this, 'disposeInternal');
      this.duration_ = null;
      if (this.autoCloseTimer_) {
        clearTimeout(this.autoCloseTimer_);
        this.autoCloseTimer_ = null;
      }
      this.fitBottom_ = null;
      this.capsule_ = null;
      if (Toast.currentToast === this) {
        Toast.currentToast = null;
      }
    }


});


exports = Toast;
