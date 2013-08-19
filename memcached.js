var poolModule = require('generic-pool');
var	nMemcached = require( 'memcached' ),
	memcached;
    var pool = poolModule.Pool({
        name     : 'memPool',
        create   : function(callback) {
			 nMemcached.config.poolSize = 50;
            var client  = new nMemcached( "127.0.0.1:11211" );
            callback(null, client);  

        },
        destroy  : function(client) { client.end(); },
        max      : 50,   
        idleTimeoutMillis : 30000, 
        log : true,  
    });
	Date.prototype.format = function(format)
{
var o = {
"M+" : this.getMonth()+1, //month
"d+" : this.getDate(), //day
"h+" : this.getHours(), //hour
"m+" : this.getMinutes(), //minute
"s+" : this.getSeconds(), //second
"q+" : Math.floor((this.getMonth()+3)/3), //quarter
"S" : this.getMilliseconds() //millisecond
}
if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(this.getFullYear()+"").substr(4 - RegExp.$1.length));
for(var k in o)if(new RegExp("("+ k +")").test(format))
format = format.replace(RegExp.$1,
RegExp.$1.length==1 ? o[k] :
("00"+ o[k]).substr((""+ o[k]).length));
return format;
}
function select(url,res,req){
	pool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function  
		console.log("is error:"+err.message);
		
    }
    else {

     client.get( "comment", function( err, result ){
		if( err ) console.error( err );
		res.writeHead(200,{"Content-Type":"application/json;; charset=utf-8"});         
		res.write(result);
		//memcached.end();
		pool.release(client);
		res.end();	
	 // as we are 100% certain we are not going to use the connection again, we are going to end it
	});
    }
});
}
function set(key,value){
	//console.log(value.length());
	pool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function  
		console.log("is error:"+err.message);
		
    }
    else {
	console.log('erroe');
   client.set( key,value, 1000000, function( err, result ){
		if( err ) console.error( err );
		
		//console.dir( result );
		pool.release(client);
		 // as we are 100% certain we are not going to use the connection again, we are going to end it
	});
    }
});
}
exports.select = select;  
exports.set=set;



