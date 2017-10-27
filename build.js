#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var cmd = require('./lib/cmd');
var style = require('./lib/style');
var script = require('./lib/script');
var crc32 = require('./lib/crc32');
var commander = require('commander');

var namespace = process.argv[2];

commander
  .version('0.1.0')
  .arguments('<ns>')
  .action(function(ns) {
    namespace = ns;
  })
  .option('--define [value]', 
    'Override the value of a variable annotated @define', 
    function(val, memo) {
      memo.push(val);
      return memo;
    }, [])
  .option('--jsonly', 'Compile Javascript Only')
  .parse(process.argv);

if (!namespace) {
  console.error('no command given!');
  process.exit(1);
}

var compile = function() {
    if (isMixin()) {

      csc(function(css) {
          jtc(function(injecter) {
            jsc(function(js) {
              [css, js, injecter].forEach(function(item) {
                if (isError(item)) {
                print(item);
                }
                });
              //jsw(print)(mixin(css, js, injecter));
              jsw(print)(mixin(injecter, css, js));
              });
            })
          });

    } else {

      if (!isCompileCssOnly()) {
        jsc(
            closure(
              jsw(print)
              )
           );
      }

      if (!isCompileJsOnly()) {
        csc(
            csw(print)
           );
      }

    }

};

function print(str) {
  console.log(str);
}

function map(list, fn) {
  return Array.prototype.map.call(list, fn); 
}

function closure(fn) {
  return function(str) {
    fn(isError(str) ? str : wrap(str));
  };
}

function callback(fn, cb) {
  return function(value) {
    cb(fn(value));
  }
}

function wrap() {
  return map(arguments, function(str) {
      return '(function(){' + str + '})();';
      }).join('');
}

function jsc(fn) {
  script.compile(namespace, commander.define, fn, error(fn));
}

function jsw(fn) {
  return write(script, fn);
}

function jtc(fn) {
  script.compile('mem.widget.styleinjecter', commander.defin, fn, error(fn));
}

function csc(fn) {
  style.compile(namespace, fn, error(fn));
}

function csw(fn) {
  return write(style, fn);
}

function write(builder, fn) {
  return function(res) {
    if (isError(res)) {
      fn(res);
    } else {
      var id = crc32.getCode(res);
      var outPath = builder.getBuildPath(namespace)
        .replace(/\.css$/, '-' + id + '.css')
        .replace(/\.js$/, '-' + id + '.js');
      mkdirs(path.dirname(outPath), null, function() {
          fs.writeFileSync(outPath, res);
          fn(rpath(outPath));
          });
    }
  };
}

function isMixin() {
  return process.argv[3] == '-mixin';
}

function isCompileCssOnly() {
  return process.argv.some(function(item) {
      return item == '-cssonly';
      });
}

function isCompileJsOnly() {
  return !!commander.jsonly;
}

function mixin(injecter, css, js) {
  return wrap('_mem_styleinjecter_style="' 
      + css.replace(/\"/g, '\'') +'";' + injecter, js);  
}

function rpath(str) {
  return path.relative(
      process.cwd(),
      path.resolve(cmd.root, '../', str)).replace(/\\/g, '/')
}

function isError(obj) {
  return obj instanceof Error;
}

function error(fn) {
  return function(e) {
    return fn(Error(e));
  }
}

function clean(fn) {
  cmd.run('rm -r ' + dir(), fn, error(fn)); 
}

function dir() {
  return path.resolve(cmd.root, '../build');
}

function mkdirs(dirpath, mode, callback) {
  fs.exists(dirpath, function(exists) {
      if(exists) {
      callback(dirpath);
      } else {
      mkdirs(path.dirname(dirpath), mode, function(){
        fs.mkdir(dirpath, mode, callback);
        });
      }
      });
}

if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

compile();
