"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _allowedOrigins = _interopRequireDefault(require("./allowedOrigins.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Cross Origin Resource Sharing
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (_allowedOrigins["default"].indexOf(_origin) !== -1 || !_origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
var _default = corsOptions;
exports["default"] = _default;