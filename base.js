
(function() {
  var doc = document;
  var scripts = doc.getElementsByTagName('script');
  var basePath;
  // Search backwards since the current script is in almost all cases the one
  // that has base.js.
  for (var i = scripts.length - 1; i >= 0; --i) {
    var src = scripts[i].src;
    var qmark = src.lastIndexOf('?');
    var l = qmark == -1 ? src.length : qmark;
    if (src.substr(l - 7, 7) == 'base.js') {
      basePath = src.substr(0, l - 7);
    }
  }

  if (basePath) {
    writeScript(basePath + 'closure-library/closure/goog/base.js');
    writeScript(basePath + 'proton-library/deps.js');
    writeScript(basePath + 'paper-library/deps.js');
    writeScript(basePath + '../src/deps.js');
  } else {
    document.write('sdk的base.js文件被改名');
  }

  function writeScript(src) {
    document.write('<script src="' + src + '"></script>');
  }

})();
