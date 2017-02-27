
var cmd = require('./cmd');
var path = require('path');

function scan(root, success, error) {
  var line = createLine(getDirs(), root);
  console.log(line);
  cmd.run(line, success, error); 
}

function getDirs() {
  return [
    'closure-templates', 
    'plu',
    'lg',
    'mem',
    'vp',
    'proton-library'
  ];
}

function createLine(dirs, root) {
  return  'python ' + createWriterPath(root) + ' ' + dirs.map(function(dir) {
    return '--root_with_prefix="' + getPath(dir) + ' ../../../' + dir + '"';
  }).join(' ').replace(/\\/g, '/');  
}

function createWriterPath(root) {
  return getPath('closure-library/closure/bin/build/depswriter.py');
}

function getPath(str) {
   return path.relative(process.cwd(),
        path.resolve(cmd.root, '../', str)).replace(/\\/g, '/')
}

exports.scan = scan; 
