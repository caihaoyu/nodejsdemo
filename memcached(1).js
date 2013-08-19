var	nMemcached = require( 'memcached' ),
	memcached;

// connect to our memcached server on host 10.211.55.5, port 11211

nMemcached.config.poolSize = 25;
memcached = new nMemcached( "127.0.0.1:11211" );


// each time a server fails
memcached.on( "issue", function( issue ){
	console.log( "Issue occured on server " + issue.server + ", " + issue.retries  + " attempts left untill failure" );
});

memcached.on( "failure", function( issue ){
	console.log( issue.server + " failed!" );
});

memcached.on( "reconnecting", function( issue ){
	console.log( "reconnecting to server: " + issue.server + " failed!" );
})

function set(key,value){
	memcached = new nMemcached( "127.0.0.1:11211" );
	memcached.set( key,value, 100000, function( err, result ){
		if( err ) console.error( err );
		
		console.dir( result );
		 // as we are 100% certain we are not going to use the connection again, we are going to end it
	});
	//memcached.end();
}

function get(){
	memcached.get( key, function( err, result ){
		if( err ) console.error( err );
		
		console.dir( result );
		//memcached.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it
	});
}
function select(url,res,req){
	memcached = new nMemcached( "127.0.0.1:11211" );
	res.writeHead(200,{"Content-Type":"application/json"});   
	memcached.get( "comment", function( err, result ){
		if( err ) console.error( err );
		res.writeHead(200,{"Content-Type":"application/json"});         
		res.write(result);
		memcached.end();
		res.end();	
	 // as we are 100% certain we are not going to use the connection again, we are going to end it
	});
	
}

exports.select = select; 
exports.set=set;
 