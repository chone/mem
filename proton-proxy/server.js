
var nodeStatic = require('node-static').Server;
var request = require("request");
var dns = require("dns");
var http = require("http");
var fs = require('fs');

var fileServer = new nodeStatic("../../");

var httpServer = http.createServer(function (req, res) {
  try {
    serverHandler(req, res);
  } catch (e) {
    console.log('\r\n', e, '\r\n', e.stack);
    try {
      res.end(e.stack);
    } catch (e) { }
  }
});

httpServer.listen(80);

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});

console.log('listen on 127.0.0.1');

function serverHandler(req, res) {
  req.addListener('end', function () {
    var url;
    if (/http/.exec(req.url)) {
      url = req.url;
    } else {
      url = 'http://' + req.headers.host + req.url;
    }

    // SDK文件自动替换路径
    /*
    if (/\/sdk\//.exec(url)) {
      sdkProxy(url, req, res);
      return;
    }
    */
    //console.log('\x1B[32m%s\x1B[39m', url)
    //console.log(req.headers.cookie)
    //console.log(req.headers['user-agent'])
    try {
      var paths = getPaths();
      console.log(paths);
      if (paths) {
        var keys = Object.keys(paths);
        var path;

        keys.forEach(function (item) {
          var regx = new RegExp(item);
          if (regx.exec(url)) {
            path = item;
          }
        });
        var p = paths[path];
        if (p) {
          if (/\.swf/.exec(p)) {
            var stream = fs.createReadStream(p);
            stream.pipe(res);
            console.log('\x1B[32m%s\x1B[39m', url)
            console.log('\x1B[32m%s\x1B[39m', ' --> ' + p);
          } else {
            var content = loadPath(p);
            if (content) {
              var matcher = url.match(/callback=([^&]*)/);
              if (matcher && matcher[1]) {
                content = matcher[1] + '(' + content + ');';
              }
              res.writeHeader(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });
              res.write(content);
              res.end();
              console.log('\x1B[32m%s\x1B[39m', url)
              console.log('\x1B[32m%s\x1B[39m', ' --> ' + p);
            }
          }
        } else {
          //console.log(url);
        }
      }
    } catch (e) {
      //console.log(e)
      console.log(e.stack);
    }

    fileServer.serve(req, res, function (err, result) {
      try {
        if (err && (err.status === 404)) {
          //本地没有文件访问线上，透明server
          dns.resolve4(req.headers.host, function (err, addresses) {
            try {
              if (err) {
                res.writeHeader(200, 'text/html');
                res.write(req.url);
                res.end(err);
              } else {
                var ip = addresses[0];
                var url;
                console.log(req.url);
                if (/http/.exec(req.url)) {
                  url = req.url;
                } else {
                  url = 'http://' + ip + req.url;
                }
                //req.headers['Host'] = req.headers.host;
                try {
                  request({
                    host: req.headers.host,
                    method: req.method,
                    url: url,
                    headers: req.headers
                  }).pipe(res);
                } catch (e) {
                  console.log(e.stack)
                }
              }
            } catch (e) { }
          });
        }
      } catch (e) { }
    });
  }).resume();

}

function getPaths() {
  var content;
  try {
    content = fs.readFileSync('./paths.js');
  } catch (e) {
  }
  return eval('(' + content + ')');
}

function loadPath(path) {
  if (typeof path == 'object') {
    return loadPathObject(path);
  } else {
    return loadPathFile(path);
  }
}

function loadPathObject(path) {
  var namespace = path.namespace;
  if (!namespace) {
    return JSON.stringify(path);
  }
  var content = '';
  var main = namespace.replace(/\./g, '/');
  // style
  if (namespace.match(/\.css\./)) {
    content = fs.readFileSync('../' + main + '.css', 'utf-8');
    content = content.replace(/([\/\.])*\/css/g, '/plu/css');
  } else {
    content = fs.readFileSync('../plu/base.js', 'utf-8');
    content += 'document.write(\'<script src="../' + main + '.js"></script>\');';
    content += 'document.write(\'<script > window.onload = ' + namespace + ';</script>\');';
  }
  return content;
}

function loadPathFile(path) {
  var content = fs.readFileSync(path, 'utf-8');
  return content;
}

function sdkProxy(url, req, res) {
  var file = url.replace(/(.*)\/sdk\/(.*)/, '../$2');
  fs.createReadStream(file).pipe(res);
  console.log('\x1B[32m%s\x1B[39m', url)
  console.log('\x1B[32m%s\x1B[39m', ' --> ' + file);
}
