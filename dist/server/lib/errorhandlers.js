'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.request_domain_error_handler = request_domain_error_handler;
exports.development_error_handler = development_error_handler;
exports.production_error_handler = production_error_handler;
// TODO: Logs written to file + sent to remote log consolidation server

function request_domain_error_handler(e) {
	console.error('REQUEST_ERROR');
	console.error(e.message);
	console.error(e.stack);
	next(e);
}

function development_error_handler(err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500);
	res.send(err.message);
}

// TODO: Return a pretty error view instead of the actual error message
function production_error_handler(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
}