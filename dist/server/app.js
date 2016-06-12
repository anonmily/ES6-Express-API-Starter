'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _domain = require('domain');

var _domain2 = _interopRequireDefault(_domain);

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _errorhandlers = require('./lib/errorhandlers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants

// Internal Dependencies
// External/Third-party Dependencies
var env = process.env;
console.log('NODE_ENV = ' + env['NODE_ENV']);

// Application
var app = (0, _express2.default)();
app.locals.requests = 0;
app.set('x-powered-by', false);

// Middleware - Application-wide
app.use((0, _cors2.default)({
	exposedHeaders: ['Link']
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());

// Each request runs on its own domain, so an error in a request doesn't crash everything
app.use(function domain_middleware(req, res, next) {
	var d = _domain2.default.create();
	console.log(app.locals);
	d.id = new Date().getTime() + app.locals.requests++;
	d.add(req);
	d.add(res);
	d.run(function () {
		next();
	});
	d.on('error', _errorhandlers.request_domain_error_handler);
});

// Routes
(0, _db2.default)(function (λ) {
	// internal middleware
	app.use((0, _middleware2.default)());

	// api router
	app.use('/', (0, _api2.default)());

	app.use('/error', function (req, res, next) {
		// Because each request runs on its own domain, errors are handled  by the request_domain_error_handler
		throw new Error('error! mayday! mayday!');
	});
});

// Error handlers
if (env['NODE_ENV'] !== 'PRODUCTION') {
	app.use(_errorhandlers.development_error_handler);
} else {
	app.use(_errorhandlers.production_error_handler);
}

exports.default = app;