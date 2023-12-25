"use strict";

var _dateFns = _interopRequireDefault(require("date-fns"));

var _uuid = require("uuid");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logEvents = function logEvents(message, logName) {
  var dateTime, logItem;
  return regeneratorRuntime.async(function logEvents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dateTime = "".concat((0, _dateFns["default"])(new Date(), 'yyyyMMdd\tHH:mm:ss'));
          logItem = "".concat(dateTime, "\t").concat((0, _uuid.uuid)(), "\t").concat(message, "\n");
          _context.prev = 2;

          if (_fs.fs.existsSync(_path["default"].join(__dirname, 'logs'))) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(_fs.fsPromises.mkdir(_path["default"].join(__dirname, 'logs')));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_fs.fsPromises.appendFile(_path["default"].join(__dirname, 'logs', logName), logItem));

        case 8:
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

module.exports = logEvents;