var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');

http.createServer(function (req, res) {
  if (req.url == '/fileupload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.error(err.message);
        return;
      }

      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Samuel/Desktop/AW/javascript-ns/' + files.filetoupload.name;

      mv(oldpath, newpath, function (err) {
        if (err) {
          console.error(err.message);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('File uploaded and moved!');
          res.end();
        }
      });
    });

  } else if (req.url == '/' && req.method.toLowerCase() === 'get') {
    // Respond to GET request at '/'
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Prueba IAW - Pagina principal_Samuel</h1>');
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  } else if (req.url == '/samuel' && req.method.toLowerCase() === 'get') {
    // Respond to GET request at '/samuel'
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<h1>Prueba IAW - Pagina alterna_Samuel</h1>");
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  } else {
    // Handle other routes or methods
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }

}).listen(8080);


