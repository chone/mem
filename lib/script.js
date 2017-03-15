
var path = require('path');
var fs = require('fs');

var cmd = require('./cmd');
var _ = require('./lodash');

function compile(namespace, success, fail) {
  var entry = getEntry(namespace);
  console.log(entry)
  if (!fs.existsSync(entry)) {
    fail('找不到js入口 ' + getPath(entry));
    return;
  }
  var js = [
    'closure-templates/**.js',
    'proton-library/**.js',
    'closure-library/**.js'
  ];
  js = _.map(js, function(item, index) {
    return getPath(item);
  });
  js = _.map(js, function(item) {
    return '--js=' + item + '';
  });
  js.push('--js=' + getPath('../src') + '/**.js' );
  //js.push('--js=' + getPath('../build/*.js'));
  js.push('--js=!**_test.js');
  js.push('--js=!**.min.js');

  namespace = namespace.replace('.main', '');
  namespace += '.main';

  var sourceMap = getPath('../build/source_map.js');
  var locationMap = getPath('../sdk') + '|' + getPath('../src');

  var line = js.concat([ 
    //'--entry_point="goog:mapping"',
    '--entry_point="goog:' + namespace + '"',
    '--compilation_level=ADVANCED',
    '--dependency_mode=STRICT',
    //'--process_closure_primitives',
    '--create_source_map=' + sourceMap,
    //'--source_map_format=V3',
    //'--source_map_location_mapping="sdk|../sdk"',
    //'--source_map_location_mapping="src|../src"',
    //'--warning_level=VERBOSE',
    //'--create_source_map=' + getPath('source-map/'+namespace+'.js'),
    //'--output_wrapper=(function(){%output%})();',
    '--define="goog.DEBUG=false"'
  ]);

  line.splice(0, 0, getPath('closure-compiler/compiler.jar'));
  line.splice(0, 0, 'java -jar');

  line = line.join(' ');

  cmd.run(line, success, fail);

  console.log(line);
}

function getPath(str) {
   return path.relative(process.cwd(),
	path.resolve(cmd.root, str)).replace(/\\/g, '/')
}

function getEntry(namespace) {
  return path.resolve(cmd.root, '../src', 
    namespace.replace(/\./g, '/') + '/main.js'); 
}

function getBuildPath(namespace) {
  var buildRoot = path.resolve(cmd.root, '../build');
  return path.resolve(buildRoot, 
    namespace.replace(/\./g, '/') + '.js');
}


exports.compile = compile
exports.getBuildPath = getBuildPath;
