
goog.module('paper.Toast');


var Control = goog.require('goog.ui.Control');
var toast = goog.require('paper.toast.toast');


var Toast = goog.defineClass(Control, {


    constructor: function() {
      Toast.base(this, 'constructor');
    },


    show: function(options) {

    },


    hide: function() {
    }


});


exports = Toast;
