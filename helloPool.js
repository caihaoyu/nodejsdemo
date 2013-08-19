var http =require('http');
var url=require('url');
var util=require('util');
var pool=require('./pool');
var querystring = require('querystring'); 

var handle={};
handle["/"] = pool.select;  
handle["/select"] = pool.select;
handle["/login"] = login;

http.createServer(function (req,res){
	res.writeHead(200,{'Conten-type':'text/html'});
	var pathUrl=url.parse(req.url,true);
	console.log(pathUrl.query.name);
	getPath(pool,pathUrl,res,req);
	
	
}).listen(3000);
	console.log("真的假的");
function login(url, res,req){
    var info ='';  
    req.addListener('data', function(chunk){  
        info += chunk;  
     })  
    .addListener('end', function(){  
        info = querystring.parse(info);  
        if(info.name == 'a' && info.pwd =='1'){
			console.log(info.name);
            res.end('login success ' + info.name);  
        }else{  
            res.end('login failed ' + info.name);  
        }  
     })   
}

function getPath(pool,pathUrl,res,req){
	pathname=pathUrl.pathname;
	 if(typeof handle[pathname] === 'function'){  
        handle[pathname](url,res,req);  //执行对应的函数  
    }else{  
        console.log("No request handle found for " + pathname +'\n');  
        res.writeHead(404,{"Content-Type":"text/plain"});  
        res.write("404 Not found");  
        res.end();  
    }  
}

