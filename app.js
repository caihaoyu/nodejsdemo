var http =require('http');
var url=require('url');
var util=require('util');
var pool=require('./pool');

var handle={}; 
handle["/image"] = pool.selectImage;

function listen(prot){
http.createServer(function (req,res){
	//res.writeHead(200,{'Conten-type':'text/html'});
	var pathUrl=url.parse(req.url,true);
	getPath(pool,pathUrl,res,req);
	
}).listen(prot);
	console.log("启动成功");
}
function getPath(pool,pathUrl,res,req){
	pathname=pathUrl.pathname;
	 if(typeof handle[pathname] === 'function'){  
        handle[pathname](pathUrl,res,req);  //执行对应的函数  
    }else{  
        console.log("No request handle found for " + pathname +'\n');  
        res.writeHead(404,{"Content-Type":"text/plain"});  
        res.write("404 Not found");  
        res.end();  
    }  
}
exports.listen = listen;  

