var http = require('http');
var joyce = require('./joyceHaiku');
var renderer = require('./renderer');
var poemManager = require('./poemManager');

http.createServer(function (request, response)
{
	if((request.url==="/haiku" && request.method.toLowerCase()==="get") || request.method.toLowerCase()==="post")
	{
		poemManager.writePoemInFile();
		response.writeHead(200,{'Content-Type': 'text/html'});
		renderer.view("views/header", response);
		renderer.view("views/poem",response);
		renderer.view("views/footer",response);
	}
	response.end();

}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
