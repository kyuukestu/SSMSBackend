"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewUser = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("../Models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handleNewUser = function handleNewUser(req, res) {
  var _req$body, user, pwd, duplicate, hashedPwd, result;

  return regeneratorRuntime.async(function handleNewUser$(_context) {
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
          duplicate = _context.sent;

          if (!duplicate) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.sendStatus(409));

        case 8:
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(pwd, 10));

        case 11:
          hashedPwd = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(_User["default"].create({
            username: user,
            password: hashedPwd
          }));

        case 14:
          result = _context.sent;
          console.log(result);
          res.status(201).json({
            success: "New user ".concat(user, " created!")
          });
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](8);
          res.status(500).json({
            message: _context.t0.message
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 19]]);
};

exports.handleNewUser = handleNewUser;