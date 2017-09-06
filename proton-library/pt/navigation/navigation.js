
goog.provide('pt.navigation');


pt.navigation.EventType = {
  NAVIGATION: 'navigation'
};


pt.navigation.requestNavigation = function(page, data) {
  data.type = pt.navigation.EventType;
  page.dispatchEvent(data);
}
