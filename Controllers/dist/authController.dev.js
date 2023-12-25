"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLogin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("../Models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleLogin = function handleLogin(req, res) {
  var _req$body, user, pwd, foundUser, match, roles, accessToken, refreshToken, result;

  return regeneratorRuntime.async(function handleLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user = _req$body.user, pwd = _req$body.pwd;

          if (!(!user || !pwd)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Username & Password are required.'
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            username: user
          }).exec());

        case 5:
          foundUser = _context.sent;

          if (foundUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.sendStatus(401));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(pwd, foundUser.password));

        case 10:
          match = _context.sent;

          if (!match) {
            _context.next = 24;
            break;
          }

          roles = Object.values(foundUser.roles).filter(Boolean); // Create JWT

          accessToken = _jsonwebtoken["default"].sign({
            UserInfo: {
              username: foundUser.username,
              roles: roles
            }
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '5m'
          } //Change duration of access token
          );
          refreshToken = _jsonwebtoken["default"].sign({
            username: foundUser.username
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
          }); // Saving refreshToken with current user

          foundUser.refreshToken = refreshToken;
          _context.next = 18;
          return regeneratorRuntime.awrap(foundUser.save());

        case 18:
          result = _context.sent;
          console.log(result);
          res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            // secure: true, // May need to be commented out when testing with ThunderClient
            maxAge: 24 * 60 * 60 * 1000
          }); // Send refreshToken as HttpOnly cookie; age of one day

          res.json({
            accessToken: accessToken
          });
          _context.next = 25;
          break;

        case 24:
          res.sendStatus(401); // Unauthorized

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.handleLogin = handleLogin;