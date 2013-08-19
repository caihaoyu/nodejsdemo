var cluster=require('cluster');
var os=require('os');

var numOfCpus=os.cpus().length;

console.log(numOfCpus);

var workers={};

if(cluster.isMaster){
	cluster.on('death',function (worker){
		delete workers[woeker.pid];
		worker=cluster.fork();
		workers[worker.pid]=worker;
	});
	for(var i=0;i<numOfCpus;i++){
		var worker=cluster.fork();
		workers[worker.pid]=worker;
	}
}else{
	var app=require('./server');
	app.listen(3000);
	
}
process.on(
	'SIGTERM',function(){
		for(var pid in workers){
			process.kill(pid);
	}
	process.exit(0);
});