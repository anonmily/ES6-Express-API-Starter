'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/test', _test2.default);

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({
			version: '1.0'
		});
	});

	return api;
};

var _express = require('express');

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }