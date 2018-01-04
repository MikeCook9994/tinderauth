'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('tinderauth');

var FACEBOOK_AUTHENTICATION_TOKEN_URL = 'https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd';
var URL_REGEX = /\/v[0-9]\.[0-9]\/dialog\/oauth\/(confirm|read)\?dpr=[0-9]{1}/;

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email, password) {
        var browser, page, selectorRegex, token, _ref2, id;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        email = email || process.env.FACEBOOK_EMAIL;
                        password = password || process.env.FACEBOOK_PASSWORD;

                        if (!(!email || !password)) {
                            _context.next = 4;
                            break;
                        }

                        throw new Error('Define username and password via env vars or provide them via function paramaters');

                    case 4:
                        _context.next = 6;
                        return _puppeteer2.default.launch();

                    case 6:
                        browser = _context.sent;
                        _context.next = 9;
                        return browser.newPage();

                    case 9:
                        page = _context.sent;
                        _context.prev = 10;
                        _context.next = 13;
                        return page.goto(FACEBOOK_AUTHENTICATION_TOKEN_URL);

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](10);
                        throw new Error('Unable to access login page. Ensure you are connected to the internet and contact the developer if this error persists.');

                    case 18:
                        _context.prev = 18;
                        _context.next = 21;
                        return page.type("input[name=email]", email);

                    case 21:
                        _context.next = 23;
                        return page.type("input[name=pass]", password);

                    case 23:
                        _context.next = 29;
                        break;

                    case 25:
                        _context.prev = 25;
                        _context.t1 = _context['catch'](18);
                        selectorRegex = /input\[name=([a-zA-Z]+)\]/;
                        throw new Error('Unable to locate form field "' + _context.t1.message.match(selectorRegex)[1] + '". Contact the developer if this problem persists.');

                    case 29:

                        debug('entered username and password');

                        _context.prev = 30;
                        _context.next = 33;
                        return page.click("button[name=login]");

                    case 33:
                        _context.next = 38;
                        break;

                    case 35:
                        _context.prev = 35;
                        _context.t2 = _context['catch'](30);
                        throw new Error('No login button found. If this error persists contact the developer.');

                    case 38:
                        _context.next = 40;
                        return page.waitForNavigation();

                    case 40:
                        _context.next = 42;
                        return page.$('button[name=__CONFIRM__');

                    case 42:
                        _context.t3 = _context.sent;

                        if (!(_context.t3 == null)) {
                            _context.next = 45;
                            break;
                        }

                        throw new Error('Login failed. Ensure username and password are correct');

                    case 45:

                        debug('login succeeded');

                        token = '';
                        _context.next = 49;
                        return page.evaluate('window.isResponseFound = false');

                    case 49:

                        page.on('response', function (response) {
                            if (response.request().url.match(URL_REGEX)) {
                                debug('found matching response to facebook to tinder authorization request');
                                response.text().then(function (body) {
                                    page.removeAllListeners('response');
                                    token = body.match(/access_token=(.+)&/)[1];
                                    page.evaluate('window.isResponseFound = true');

                                    debug('auth token: ' + token);
                                });
                            }
                        });

                        _context.prev = 50;
                        _context.next = 53;
                        return page.click('button[name=__CONFIRM__]');

                    case 53:
                        _context.next = 58;
                        break;

                    case 55:
                        _context.prev = 55;
                        _context.t4 = _context['catch'](50);
                        throw new Error('Unable to click button to authorize tinder. Contact the developer if this issue persists.');

                    case 58:
                        _context.next = 60;
                        return page.waitForFunction('window.isResponseFound === true');

                    case 60:
                        _context.next = 62;
                        return _axios2.default.get('https://graph.facebook.com/me?access_token=' + token);

                    case 62:
                        _ref2 = _context.sent;
                        id = _ref2.data.id;


                        debug('got profile id: ' + id);

                        return _context.abrupt('return', { token: token, id: id });

                    case 66:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[10, 15], [18, 25], [30, 35], [50, 55]]);
    }));

    function getTokenAndId(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return getTokenAndId;
}();