var poolModule = require('generic-pool');
var	pg = require('pg');
    var pool = poolModule.Pool({
        name     : 'pgPool',
        create   : function(callback) {
            var client = new pg.Client("tcp://postgres:postgres@localhost:5432/cai_test");
			client.connect();
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
function selectImage(url,res,req){
	pool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function  
		console.log("is error:"+err.message);
		
    }
    else {
		var fileId= url.query.fileId;
        client.query("select  * from app_appimage where fileid=$1", [fileId], function(err, result)  {
			  if (err) {
				// handle error - this is generally the err from your
				// factory.create function  
				console.log("is error:"+err.message);
		
			}
				res.writeHead(200,{"Content-Type":"application/json"});  
				
				res.write(url.query.callback+'('+JSON.stringify(result)+')'); 
				pool.release(client);
				res.end();
				// return object back to pool
				
        });
    }
});
}
exports.selectImage = selectImage;




