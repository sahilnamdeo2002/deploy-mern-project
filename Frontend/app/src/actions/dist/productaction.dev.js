"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductdetails = exports.getProduct = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _productconstant = require("../constants/productconstant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getProduct = function getProduct() {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _productconstant.ALL_PRODUCT_REQUEST
            });
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/products"));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _productconstant.ALL_PRODUCT_SUCCESS,
              payload: data
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _productconstant.PRODUCT_DETAILS_FAIL,
              payload: _context.t0.response.data.message
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.getProduct = getProduct;

var getProductdetails = function getProductdetails(id) {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _productconstant.PRODUCT_DETAILS_REQUEST
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/product/".concat(id)));

          case 4:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _productconstant.PRODUCT_DETAILS_SUCCESS,
              payload: data.product
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _productconstant.PRODUCT_DETAILS_FAIL,
              payload: _context2.t0.response.data.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.getProductdetails = getProductdetails;