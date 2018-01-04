'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _es5Src = require('../es5-src');

var _es5Src2 = _interopRequireDefault(_es5Src);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

describe('TEST', function () {
    it('ENV vars should be set', function () {
        (0, _chai.expect)(process.env.FACEBOOK_EMAIL, 'you need to set FACEBOOK_EMAIL env var').to.be.a('string');
        (0, _chai.expect)(process.env.FACEBOOK_PASSWORD, 'you need to set FACEBOOK_PASSWORD env var').to.be.a('string');
        (0, _chai.expect)(process.env.FACEBOOK_EXPECTED_USER_ID, 'you need to set FACEBOOK_EXPECTED_USER_ID env var').to.be.a('string');
    });

    it('should work', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, token, id;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _es5Src2.default)();

                    case 2:
                        _ref2 = _context.sent;
                        token = _ref2.token;
                        id = _ref2.id;

                        (0, _chai.expect)(id).to.be.equal(process.env.FACEBOOK_EXPECTED_USER_ID);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));
});