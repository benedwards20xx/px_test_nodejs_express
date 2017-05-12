var http = require('http');
const pool = require('./lib/db');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var t = pool.query('SELECT * FROM public.puzzles_test', function(err, res) {
    if(err) {
      return console.error('error running query', err);
    }

    console.log('number:', res.rows[0]);
  });
  res.end('Hello World\n' + t);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');