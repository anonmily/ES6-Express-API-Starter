// TODO: Logs written to file + sent to remote log consolidation server

export function request_domain_error_handler(e) {
	console.error('REQUEST_ERROR')
	console.error(e.message)
	console.error(e.stack)
	next(e)
}

export function development_error_handler(err, req, res, next) {
	console.error(err.stack)
	res.status(err.status || 500)
	res.send(err.message)
}

// TODO: Return a pretty error view instead of the actual error message
export function production_error_handler(err, req, res, next) {
	res.status(err.status || 500)
	res.send(err.message)
}