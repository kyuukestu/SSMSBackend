"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _allowedOrigins = _interopRequireDefault(require("../Config/allowedOrigins.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var credentials = function credentials(req, res, next) {
  var origin = req.headers.origin;

  if (_allowedOrigins["default"].includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }

  next();
};

var _default = credentials;
exports["default"] = _default;