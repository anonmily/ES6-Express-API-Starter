import http from 'http'
import app from './app'
const cluster = require('cluster')

const PORT = process.env.PORT || 3333

if(cluster.isMaster) {

	cluster.fork()
	//cluster.fork()
	cluster.on('disconnect', worker => {
		console.error('WORKER_DISCONNECT')
		cluster.fork()
	})

}else{

	console.log(`PORT=${PORT}`)
	var server = http.createServer(app).listen( PORT )
	console.log(`Started on port ${ PORT }`)

}