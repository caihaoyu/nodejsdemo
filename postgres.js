var pg= require('pg');

var conString = "tcp://postgres:postgres@localhost:5432/cai_test";  

var client = new pg.Client(conString);  
 client.connect();
  //query is executed once connection is established and
  //PostgreSQL server is ready for a query

//构造一个数据库对象  
function select(url,res){
var client = new pg.Client(conString);  
 client.connect();
  //query is executed once connection is established and
  //PostgreSQL server is ready for a query
  var query = client.query("SELECT * FROM app_appimage",[], function(err, result)  {
			  if (err) {
				// handle error - this is generally the err from your
				// factory.create function  
				console.log("is error:"+err.message);
		
			}
			 
				res.writeHead(200,{"Content-Type":"text/plain"});         
				res.write(JSON.stringify(result)); 
				//pool.release(client);
				res.end();
				// return object back to pool
        });
}
function setMemcached(memcached){
var client = new pg.Client(conString);  
 client.connect();
  //query is executed once connection is established and
  //PostgreSQL server is ready for a query
  var query = client.query("SELECT * FROM app_appimage",[], function(err, result)  {
			  if (err) {
				// handle error - this is generally the err from your
				// factory.create function  
				console.log("is error:"+err.message);
		
			}
				console.log("=============");
				memcached.set("comment",JSON.stringify(result));
				client.end();
				// return object back to pool
        });
}
exports.select = select; 
exports.setMemcached = setMemcached
