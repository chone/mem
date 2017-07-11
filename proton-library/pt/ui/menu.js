
goog.provide('pt.ui.Menu');

goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuRenderer');
goog.require('goog.ui.ContainerRenderer');


goog.scope(function() {


  var _ = pt.ui;


  _.Menu = goog.defineClass(goog.ui.Menu, {

      constructor: function(options) {
        var opt = options || {};
        var renderer = goog.ui.ContainerRenderer.getCustomRenderer(
          goog.ui.MenuRenderer, opt.css || goog.getCssName('pt-menu')
        );
        _.Menu.base(this, 'constructor', null, renderer); 
        this.$ = {};
        this._ = {};
      },

      disposeInternal: function() {
        _.Menu.base(this, 'disposeInternal');
        goog.object.clear(this.$);
        this.$ = null;
        goog.object.clear(this._);
        this._ = null;
      }

  });


});
