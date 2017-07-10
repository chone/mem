
goog.provide('pt.number');

pt.number.comma = function(num) {
  num += '';
  var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return num.replace(re, "$1,");
};
