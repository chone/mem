#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cmd = require('./lib/cmd');

scan(cmd.root, function(value) {
  fs.writeFileSync(cmd.root + '/../src/deps.js', value);
  console.log('完成');
}, function(error) {
  console.log(error);
});

function scan(root, success, error) {
  var line = createLine(root);
  console.log(line);
  cmd.run(line, success, error); 
}

function createLine(root) {
  return 'python ' + createWriterPath(root) + 
    ' --root_with_prefix="src ../../../../src"';  
}

function createWriterPath(root) {
  return getPath('closure-library/closure/bin/build/depswriter.py');
}

function getPath(str) {
   return path.relative(process.cwd(),
        path.resolve(cmd.root, './', str)).replace(/\\/g, '/')
}




