
goog.require('pt.App');

goog.require('goog.ui.Component');


goog.scope(function() {


  var _ = pt;


  /**
   * @constructor
   */
  _.App = function() {
    _.App.base(this, 'constructor');
    this.destinationPromises = {};
    this.requestHandlers = [];
    // ?
    this.node = a;
    goog.events.listen(this, pt.navigation.EventType.NAVIGATION,
      this.handleNavigationEvent_, false, this);
  };
  goog.inherits(_.App, goog.ui.Component);


});


