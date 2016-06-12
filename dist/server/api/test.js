'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _simplyIs = require('simply-is');

var _simplyIs2 = _interopRequireDefault(_simplyIs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _auth = require('../lib/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MAIN

// External Dependencies
var router = (0, _express.Router)();

// Internal Dependencies

router.get('/', function get_test(req, res, next) {
	res.send('Hello world!');
});

exports.default = router;