
var cmd = require('./cmd');
var _ = require('./lodash');
var path = require('path');
var fs = require('fs');

function compile(namespace, success, fail) {
  var entry = getEntry(namespace);
  if (!fs.existsSync(entry)) {
    fail('找不到js入口 ' + getPath(entry));
    return;
  }
  var js = [
    '../closure-templates/**.js',
    '../closure-library/**.js',
    'pt/**.js'
  ];
  js = _.map(js, function(item, index) {
    return getPath(item);
  });
  js = _.map(js, function(item) {
    return '--js=' + item + '';
  });
  js.push('--js=!**_test.js');
  js.push('--js=!**.min.js');

  var line = js.concat([ 
    '--closure_entry_point="' + namespace + '.main"',
    '--compilation_level=ADVANCED_OPTIMIZATIONS',
    '--only_closure_dependencies',
    //'--warning_level=VERBOSE',
    //'--create_source_map=' + getPath('source-map/'+namespace+'.js'),
    //'--output_wrapper=(function(){%output%})();',
    '--define=goog.DEBUG=false'
  ]);

  line.splice(0, 0, getPath('../closure-compiler/compiler.jar'));
  line.splice(0, 0, 'java -jar');

  cmd.run(line.join(' '), success, fail);
}

function getPath(str) {
   return path.relative(process.cwd(),
	path.resolve(cmd.root, '../', str)).replace(/\\/g, '/')
}

function getEntry(namespace) {
  return path.resolve(cmd.root, '../', 
    namespace.replace(/\./g, '/') + '/main.js'); 
}

function getBuildPath(namespace) {
  var buildRoot = path.resolve(cmd.root, '../build');
  return path.resolve(buildRoot, 
    namespace.replace(/\./g, '/') + '.js');
}


exports.compile = compile
exports.getBuildPath = getBuildPath;
