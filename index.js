var express = require('express');
var path = require('path');
var app = module.exports = express();

app.get('/', function(req, res){
	res.send('<ul>' 
		+ '<li>Download <a href="/files/amazing.txt">amazing.txt</a>.</li>'
		+ '<li>Download <a href="/files/huy.txt">huy.txt</a>.</li>'
		+ '</ul>');
});

// /files/* is accessed via req.params[0]
// but here we name it :file
app.get('/files/:file(*)', function(req, res, next){
	var filePath = path.join(__dirname, 'files', req.params.file);

	res.download(filePath, function(err){
		if(!err) return; //file sent
		if(err.status !== 404) return next(err);
		res.statusCode = 404;
		res.send('Cant find that file, sorry!')
	});
});

if(!module.parent){
	app.listen(3000);
	console.log('Express started on port 3000 ');
}