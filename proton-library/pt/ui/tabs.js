
goog.provide('pt.ui.Tabs');

goog.require('goog.ui.TabBar');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.TabBarRenderer');


goog.scope(function() {


  var _ = pt.ui;


  var ContainerRenderer = goog.ui.ContainerRenderer;


  _.Tabs = goog.defineClass(goog.ui.TabBar, {

      constructor: function(options) {
        var opt = options || {};
        var css = opt.css; 
        var renderer = ContainerRenderer.getCustomRenderer(
          goog.ui.TabBarRenderer, css || goog.getCssName('pt-tabs')
        ); 
        _.Tabs.base(this, 'constructor', null, renderer);
      }

  });


});
