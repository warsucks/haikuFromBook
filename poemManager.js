var fs = require('fs');
var joyce = require('./joyceHaiku');

function writePoemInFile(poem)
{
	var poem = joyce.writePoem([5,7,5]);
	poem = poem.replace(/\n/g,"<br>");
	fs.writeFileSync("views/poem.html",poem);
}

module.exports.writePoemInFile = writePoemInFile;