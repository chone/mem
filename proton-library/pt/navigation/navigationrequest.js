
goog.provide('pt.navigation.NavigationRequest');
goog.provide('pt.navigation.Event');
goog.provide('pt.navigation.NavigationRequestState');


/**
 * @constructor
 */
pt.navigation.NavigationRequest = function(params) {
  this.destination = pt.navigation.NavigationRequest.DEFAULT_DESTINATION;
  this.params = params;
};


pt.navigation.NavigationRequest.DEFAULT_DESTINATION = 'default';


pt.navigation.NavigationRequestState = {
  LOADING: 'loading',
  PROCESSING: 'processing',
  DONE: 'done'
};







