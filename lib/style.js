
var fs = require('fs');
var path = require('path');
var cmd = require('./cmd');
var _ = require('./lodash');

function scan(entry) {
  var next = [entry];
  var requires = [];
  var images = [];
  while (next.length > 0) {
    var file = next.pop();
    var index = requires.indexOf(file);
    if (index > 0) {
      requires.splice(index, 1);
    }
    requires.splice(0, 0, file);

    var content = fs.readFileSync(file, 'utf-8')
    var res = getRequires(content, file);
    _.map(getImages(content), function(image) {
      images.push([image, file]);
    });

    if (res) {
      _.map(res, function(item) {
	if (next.indexOf(item) == -1) { 
	  next.push(item);
	}
      });
    }
  }
  return [requires, images];
}

function compile(namespace, success, fail) {
  var entry = getEntry(namespace); 
  if (!fs.existsSync(entry)) {
    fail('找不到css入口 ' + getPath(entry));
    return;
  }
  var list = scan(entry);
  var requires = list[0];
  var images = list[1];
  images = _.map(images, function(image) {
    return [
      image[0], 
      /file:\/\/\//.exec(image[0]) ? image[0] :
      (getCdnUri(image[1]) + '' + getImagePath(image[0]))	
    ];
  });

  var line = 'java -jar %jar% --allow-unrecognized-functions' +
      //' --output-renaming-map-format CLOSURE_COMPILED' + 
      //' --rename CLOSURE' +
      //' --output-renaming-map %mapping%' +
      ' %files%';

  line = line
      .replace(
          /%jar%/g, 
	        path.resolve(cmd.root, 
              'closure-stylesheets/closure-stylesheets.jar')
      )
      .replace(
          /%mapping%/g, 
	        path.resolve(cmd.root, '../build/renaming_map.js')
      )
      .replace(
          /%files%/g, 
          requires.join(' ')
      );

  cmd.run(
    line,
    function(style) {
      _.map(images, function(image) {
	style = style.replace(image[0], image[1]);
      });
      style = style.replace(/@import url\(["']?([^\"\'\)])*["']?\);?/g, '');
      success(style);         
  }, fail);

  console.log(line);
}

function getCdnUri(str) {
  return '';
  var uri = '/s/' +
    path.relative(cmd.root + '../src', path.dirname(str))
      .match(/^([^\/\\]*).*/)[1];	
  uri = uri.replace(/\/\.\./, '/proton');
  return uri;

}

function getImagePath(str) {
  return str.replace(/.*images/, 'images');
}

function getRequires(content, file) {
  return _(content) 
    .words(/@import url\(["']?([^\"\'\)])*["']?\);?/g)
    .map(function(item) {
      return path.resolve(path.dirname(file), 
	item.match(/url\(['"]?([^\(\)'"]*)['"]?\)/)[1]);
    });
}

function getPath(str) {
  return path.relative(process.cwd(),
	path.resolve(cmd.root, '../', str)).replace(/\\/g, '/')
}

function getImages(content) {
  return _(content) 
    .words(/url\(['"]?([^\(\)]*)['"]?\)/g)
    .filter(function(item) {
       if (/^http/.exec(item) || /^about/.exec(item) 
	 || /\.css/.exec(item)) {      
           return false;
       }
       return true;
    })
    .map(function(item) {
      return item.match(/url\(['"]?([^\(\)'"]*)['"]?\)/)[1];
    })
    ;
}

function getEntry(namespace) {
  return path.resolve(cmd.root, '../src', 
    (namespace.replace(/\./g, '/') + '/').replace(/\//, '/css/') + 'main.css'); 
}

function getImageRoot(namespace) {
  return path.resolve(cmd.root, '../', 
    namespace.replace(/\./g, '/').replace(/\//, '/images/')); 
}

function getBuildPath(namespace) {
  var buildRoot = path.resolve(cmd.root, '../build');
  return path.resolve(buildRoot, 
    namespace.replace(/\./, '.css.').replace(/\./g, '/') + '.css');
}

exports.compile = compile;
exports.getBuildPath = getBuildPath;
