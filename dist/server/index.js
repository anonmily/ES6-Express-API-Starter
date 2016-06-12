'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cluster = require('cluster');

var PORT = process.env.PORT || 3333;

if (cluster.isMaster) {

	cluster.fork();
	//cluster.fork()
	cluster.on('disconnect', function (worker) {
		console.error('WORKER_DISCONNECT');
		cluster.fork();
	});
} else {

	console.log('PORT=' + PORT);
	var server = _http2.default.createServer(_app2.default).listen(PORT);
	console.log('Started on port ' + PORT);
}