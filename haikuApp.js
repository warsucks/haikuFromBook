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
		renderer.view("views/header", response);
		renderer.view("views/poem",response);
		renderer.view("views/footer",response);
	}
	response.end();

}).listen(process.env.PORT || 5000);
