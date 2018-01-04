#!/usr/bin/env node
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _es5Src = require('../es5-src');

var _es5Src2 = _interopRequireDefault(_es5Src);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _tinder = require('tinder');

var _tinder2 = _interopRequireDefault(_tinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tinderApi = _bluebird2.default.promisifyAll(new _tinder2.default.TinderClient());

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var questions, _ref2, email, password, _ref3, token, id, tinderToken;

    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    questions = [{
                        type: 'input',
                        name: 'email',
                        message: 'Email'
                    }, {
                        type: 'password',
                        name: 'password',
                        message: 'Password'
                    }];
                    _context.next = 3;
                    return _inquirer2.default.prompt(questions);

                case 3:
                    _ref2 = _context.sent;
                    email = _ref2.email;
                    password = _ref2.password;


                    console.log('Getting your tinder fb access token this can take a while... (1-3 min)');
                    _context.next = 9;
                    return (0, _es5Src2.default)(email, password);

                case 9:
                    _ref3 = _context.sent;
                    token = _ref3.token;
                    id = _ref3.id;

                    console.log('Facebook token ready for profile ' + id + ': ' + token);

                    console.log('Getting tinder token...');
                    _context.next = 16;
                    return tinderApi.authorizeAsync(token, id);

                case 16:
                    tinderToken = tinderApi.getAuthToken();

                    console.log('Your tinder token: ' + tinderToken);

                    process.exit(0);

                case 19:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))().catch(function (e) {
    console.error('Tinderauth failed:', e.message);
    process.exit(1);
});