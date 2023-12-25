"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logEvents = require("./logEvents.js");

var errorHandler = function errorHandler(err, req, res, next) {
  (0, _logEvents.logEvents)("".concat(err.name, ": ").concat(err.message), 'errLog.txt');
  console.error(err.stack);
  res.status(500).send(err.message);
};

var _default = errorHandler;
exports["default"] = _default;