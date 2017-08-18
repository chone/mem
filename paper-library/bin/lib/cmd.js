
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var path = require('path');

var args = process.argv;
var root = path.dirname(args[1]) + '/';

/**
 *
 */
function run(command, success, failure) {
  exec(command, {
    encoding: 'utf8'
  }, function(error, stdout, stderr) {
    if (error) {
      failure(stderr);
    } else {
      if (stdout.length > 1) {
	success(stdout);	
      } else {
	success(stderr)
      }
    }
  });    
}

function runScript(file, args, success, fail) {
  execFile(file, args,function(error, stdout, stderr) {
    if (stdout.length > 1) {
      success(stdout);	
    }
    if (error) {
      fail(stderr);
    }
  });    
}

exports.root = root;
exports.run = run;
exports.runScript = runScript;



