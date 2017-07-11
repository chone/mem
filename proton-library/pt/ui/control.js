
goog.provide('pt.ui.Control');

goog.require('goog.ui.Control');
goog.require('goog.ui.ControlRenderer');


goog.scope(function() {

  var _ = pt.ui;

  _.Control = goog.defineClass(goog.ui.Control, {

      constructor: function(options) {
        var opt = options || {};  
        var renderer = goog.ui.ControlRenderer.getCustomRenderer(
          goog.ui.ControlRenderer, opt.css || goog.getCssName('pt-control')
        );
        _.Control.base(this, 'constructor', opt.text, renderer); 
        this.$ = {};
        this._ = {};
      },

      disposeInternal: function() {
        _.Control.base(this, 'disposeInternal'); 
        goog.object.clear(this.$);
        this.$ = null;
        goog.object.clear(this._);
        this._ = null;
      }

  });

});

