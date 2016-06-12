'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.shasum = shasum;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shasum(input) {
	return _crypto2.default.createHash('sha256').update(JSON.stringify(input)).digest('hex');
}