var http = require('http');
var joyce = require('./joyceHaiku');
var renderer = require('./renderer');
var poemManager = require('./poemManager');

http.createServer(function (request, response)
{
	if((request.url==="/" && request.method.toLowerCase()==="get") || request.method.toLowerCase()==="post")
	{
		poemManager.writePoemInFile();
		response.writeHead(200,{'Content-Type': 'text/html'});
		renderer.view("header", response);
		renderer.view("poem",response);
		renderer.view("footer",response);
	}
	response.end();

}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
