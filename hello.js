var http=require('http');

http.createServer(function (req,res){
	res.writeHead(200,{'Conten-type':'text/html'});
	//var pathUrl=url.parse(req.url,true);
	res.write('<h1>Hello world</h1>');
	res.end();
	
	
}).listen(3000);