var fs = require('fs');

function view(templateName, response)
{
	var fileContents = fs.readFileSync(templateName+'.html', 'utf8');
	response.write(fileContents);
}

module.exports.view = view;