
goog.provide('pt.ui.Tab');

goog.require('goog.ui.Tab');
goog.require('goog.ui.ControlRenderer');


goog.scope(function() {


  var _ = pt.ui;


  _.Tab = goog.defineClass(goog.ui.Tab, {

      constructor: function(options) {
        var opt = options || {};
        var renderer = goog.ui.ControlRenderer.getCustomRenderer(
          goog.ui.TabRenderer, opt.css || goog.getCssName('pt-tab')
        );
        _.Tab.base(this, 'constructor', opt.text, renderer); 
      }

  });


});

