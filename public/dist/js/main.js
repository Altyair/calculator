/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_CalculatorFacade_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

/**
 * Creates an instance Application.
 *
 * @constructor
 * @this {Application}
 *
 */
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.prototype.main = function () {
        Application._createCalculator();
    };
    Application._createCalculator = function () {
        var calculator = new _src_CalculatorFacade_index__WEBPACK_IMPORTED_MODULE_0__["CalculatorFacade"]({ type: 'simple' });
        calculator.create();
    };
    return Application;
}());
var application = new Application();
application.main();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CalculatorFacade", function() { return _Facade__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _MathCalculator_SimpleCalculator_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _MathCalculator_AdvancedCalculator_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);



/**
 * Creates an instance CalculatorFacade.
 *
 * @constructor
 * @this {CalculatorFacade}
 *
 */
var CalculatorFacade = /** @class */ (function () {
    /**
     * Initializing the constructor
     *
     * @this {CalculatorFacade}
     * @param {Object} options Settings of calculator
     */
    function CalculatorFacade(options) {
        /**
         * Type of Calculator
         *
         * @private
         * @type {string}
         */
        this._private__type = options.type;
    }
    CalculatorFacade.prototype.create = function () {
        var calculator;
        if (this._private__type === _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.type.simple) {
            var simpleCalculatorCore = new _MathCalculator_SimpleCalculator_index__WEBPACK_IMPORTED_MODULE_1__["SimpleCalculatorCore_ver2"]();
            var simpleCalculatorView = new _MathCalculator_SimpleCalculator_index__WEBPACK_IMPORTED_MODULE_1__["SimpleCalculatorEnableStateView"]();
            calculator = new _MathCalculator_SimpleCalculator_index__WEBPACK_IMPORTED_MODULE_1__["SimpleCalculatorController"](simpleCalculatorCore, simpleCalculatorView);
        }
        else if (this._private__type === _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.type.advanced) {
            var advancedCalculatorCore = new _MathCalculator_AdvancedCalculator_index__WEBPACK_IMPORTED_MODULE_2__["AdvancedCalculatorCore"]();
            var advancedCalculatorView = new _MathCalculator_AdvancedCalculator_index__WEBPACK_IMPORTED_MODULE_2__["AdvancedCalculatorView"]();
            calculator = new _MathCalculator_AdvancedCalculator_index__WEBPACK_IMPORTED_MODULE_2__["AdvancedCalculatorController"](advancedCalculatorCore, advancedCalculatorView);
        }
        return calculator;
    };
    return CalculatorFacade;
}());
/* harmony default export */ __webpack_exports__["default"] = (CalculatorFacade);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  math: {
    type: {
      simple: "simple",
      advanced: "advanced"
    },
    events: {
      view: {
        setDigit: "setDigit",
        setAction: "setAction",
        setUndo: "setUndo",
        setReset: "setReset",
        openGroup: "openGroup",
        closeGroup: "closeGroup"
      },
      core: {
        changeCommands: "changeCommands"
      }
    },
    operators: {
      add: 'add',
      subtract: 'subtract',
      multiply: 'multiply',
      divide: 'divide',
      openGroup: 'openGroup',
      closeGroup: "closeGroup"
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCalculatorCore_ver2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCalculatorCore_ver2", function() { return _SimpleCalculatorCore_ver2__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _SimpleCalculatorController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCalculatorController", function() { return _SimpleCalculatorController__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _viewStates_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCalculatorEnableStateView", function() { return _viewStates_index__WEBPACK_IMPORTED_MODULE_2__["SimpleCalculatorEnableStateView"]; });






/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SimpleCalculatorCore_ver2 = /** @class */ (function (_super) {
    __extends(SimpleCalculatorCore_ver2, _super);
    function SimpleCalculatorCore_ver2() {
        return _super.call(this) || this;
    }
    return SimpleCalculatorCore_ver2;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorCore"]));
/* harmony default export */ __webpack_exports__["default"] = (SimpleCalculatorCore_ver2);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AbstractCalculatorCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractCalculatorCore", function() { return _AbstractCalculatorCore__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AbstractCalculatorController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractCalculatorController", function() { return _AbstractCalculatorController__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _AbstractCalculatorView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractCalculatorView", function() { return _AbstractCalculatorView__WEBPACK_IMPORTED_MODULE_2__["default"]; });







/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _EventEmitterModule_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);


/**
 * Creates an instance CalculatorAbstract
 *
 * @constructor
 * @this {AbstractCalculatorCore}
 *
 */
var AbstractCalculatorCore = /** @class */ (function () {
    function AbstractCalculatorCore() {
        this._private__commands = [{ value: 0 }];
        this._private__result = 0;
        /**
         * Instance of EventEmitter.
         *
         * @private
         * @type {Object}
         */
        this.events = new _EventEmitterModule_index__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * Set digit value
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    AbstractCalculatorCore.prototype.setDigit = function (value) {
        var setDigit = function (commands) {
            var lastItem = commands[commands.length - 1];
            if (lastItem.value.constructor === Array && !lastItem.hasOwnProperty('action')) {
                if (!lastItem.value.length) {
                    commands.push({ value: parseFloat(value) });
                }
                else {
                    setDigit(lastItem.value);
                }
            }
            else {
                if (!lastItem.hasOwnProperty('action')) {
                    lastItem.value = !lastItem.value ? parseFloat(value) : parseFloat(lastItem.value + value);
                }
                else {
                    commands.push({ value: parseFloat(value) });
                }
            }
        };
        setDigit(this._private__commands);
        this._private__calculateResultAndNotify();
    };
    /**
     * Set action value
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    AbstractCalculatorCore.prototype.setAction = function (actionData) {
        var openGroup = _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.openGroup;
        var closeGroup = _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.closeGroup;
        var setAction = function (commands) {
            var lastItem = commands[commands.length - 1];
            if (lastItem.hasOwnProperty('action')) {
                if (actionData.operator === openGroup && lastItem.action) {
                    commands.push({ openGroup: true, value: [{ value: '' }] });
                    return true;
                }
                if (actionData.operator !== closeGroup && actionData.operator !== openGroup) {
                    if (lastItem.action && lastItem.action.priority === 1 && actionData.priority === 0) {
                        if (actionData.operator === _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.subtract) {
                            commands.push({ value: '-' });
                            return true;
                        }
                    }
                    lastItem.action = actionData;
                    return true;
                }
            }
            if (lastItem.value.constructor === Array) {
                var setActionResult = setAction(lastItem.value);
                if (!setActionResult) {
                    if (actionData.operator === closeGroup) {
                        if (lastItem.openGroup && !lastItem.closeGroup) {
                            lastItem.action = null;
                            lastItem.closeGroup = true;
                            return true;
                        }
                        return false;
                    }
                }
            }
            else {
                if (lastItem.hasOwnProperty('value') && !lastItem.value) {
                    return true;
                }
                if (actionData.operator === closeGroup) {
                    return !(commands.length > 1 && !lastItem.hasOwnProperty('action'));
                }
                if (actionData.operator === openGroup) {
                    return true;
                }
                else if (commands.length > 1 && commands[commands.length - 2].action.priority < actionData.priority) {
                    lastItem.value = [{ value: lastItem.value, action: actionData }];
                }
                else {
                    lastItem.action = actionData;
                }
            }
            return true;
        };
        if (!setAction(this._private__commands)) {
            if (actionData.operator !== _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.closeGroup) {
                this._private__commands[this._private__commands.length - 1].action = actionData;
            }
        }
        this._private__calculateResultAndNotify();
    };
    /**
     * Set undo
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    AbstractCalculatorCore.prototype.setUndo = function () {
        var setUndo = function (commands) {
            var lastItem = commands[commands.length - 1];
            if (lastItem.closeGroup) {
                lastItem.closeGroup = null;
                return true;
            }
            else if (lastItem.value.constructor === Array) {
                var result = setUndo(lastItem.value);
                if (!result) {
                    commands.pop();
                    return true;
                }
            }
            else {
                var lastItemValue = String(lastItem.value);
                if (lastItem.action) {
                    delete lastItem.action;
                }
                else if (lastItemValue.length > 1) {
                    lastItem.value = parseFloat(lastItemValue.slice(0, -1));
                }
                else if (lastItemValue.length === 1) {
                    if (commands.length > 1) {
                        commands.pop();
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        };
        if (!setUndo(this._private__commands)) {
            this._private__commands = [{ value: 0 }];
        }
        this._private__calculateResultAndNotify();
    };
    /**
     * Set reset
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    AbstractCalculatorCore.prototype.setReset = function () {
        this._private__commands = [{ value: 0 }];
        this._private__calculateResultAndNotify();
    };
    AbstractCalculatorCore.prototype._private__calculateResult = function () {
        var calculate = function (data) {
            var value = data[0].value;
            if (value === '') {
                return null;
            }
            var result = value.constructor === Array ? calculate(value) : ['-'].indexOf(value) !== -1 ? 1 : value;
            data.forEach(function (currentCommand, index, array) {
                var nextCommand = array[index + 1];
                if (currentCommand.action && nextCommand) {
                    var operand2 = nextCommand.value.constructor === Array ? calculate(nextCommand.value) : nextCommand.value;
                    if (operand2) {
                        if (operand2 === '-') {
                            operand2 = 1;
                        }
                        if (operand2) {
                            result = currentCommand.action.action(result, operand2);
                        }
                    }
                }
            });
            return result;
        };
        this._private__result = calculate(this._private__commands);
    };
    AbstractCalculatorCore.prototype._private__calculateResultAndNotify = function () {
        this._private__calculateResult();
        this.events.emit({ event: 'changeCommands', message: { commands: this._private__commands, result: this._private__result } });
    };
    AbstractCalculatorCore.prototype.getCommands = function () {
        return { commands: this._private__commands, result: this._private__result };
    };
    return AbstractCalculatorCore;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractCalculatorCore);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmitter; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * Observer
 *
 *
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._subscribers = {};
  }

  _createClass(EventEmitter, [{
    key: "emit",
    value: function emit(data) {
      var event = data.event;

      if (this._subscribers.hasOwnProperty(event)) {
        var _iterator = _createForOfIteratorHelper(this._subscribers[event]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var subscriber = _step.value;
            subscriber(data.message);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, callback) {
      if (!this._subscribers.hasOwnProperty(event)) {
        this._subscribers[event] = [];
      }

      this._subscribers[event].push(callback);
    }
  }]);

  return EventEmitter;
}();



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * Creates an instance AbstractCalculatorController.
 *
 * @constructor
 * @this {AbstractCalculatorController}
 *
 */
var AbstractCalculatorController = /** @class */ (function () {
    function AbstractCalculatorController(calculatorCore, calculatorView) {
        /**
         * Instance of AbstractCalculatorCore
         *
         * @private
         * @type {Object}
         */
        this._private__calculatorCore = calculatorCore;
        this.transitionTo(calculatorView);
    }
    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    AbstractCalculatorController.prototype.transitionTo = function (state) {
        this._private__viewState = state;
        this._private__initializeEvents();
        this._private__calculatorCore.setReset();
        this._private__viewState.setContext(this);
    };
    /**
     * Assigning handlers
     *
     * @private
     * @this {AbstractCalculatorController}
     */
    AbstractCalculatorController.prototype._private__initializeEvents = function () {
        this._private__viewState.events.subscribe(_config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setDigit, this._private__onSetDigit.bind(this));
        this._private__viewState.events.subscribe(_config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, this._private__onSetAction.bind(this));
        this._private__viewState.events.subscribe(_config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setUndo, this._private__onSetUndo.bind(this));
        this._private__viewState.events.subscribe(_config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setReset, this._private__onSetReset.bind(this));
        this._private__calculatorCore.events.subscribe(_config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.core.changeCommands, this._private__onChangeCommands.bind(this));
    };
    AbstractCalculatorController.prototype._private__onSetDigit = function (event) {
        this._private__calculatorCore.setDigit(event.value);
    };
    AbstractCalculatorController.prototype._private__onSetAction = function (event) {
        this._private__calculatorCore.setAction(event);
    };
    AbstractCalculatorController.prototype._private__onSetUndo = function () {
        this._private__calculatorCore.setUndo();
    };
    AbstractCalculatorController.prototype._private__onSetReset = function () {
        this._private__calculatorCore.setReset();
    };
    AbstractCalculatorController.prototype._private__onChangeCommands = function (event) {
        this._private__viewState.render(event);
    };
    return AbstractCalculatorController;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractCalculatorController);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventEmitterModule_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _MathModule_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


/**
 * Creates an instance AbstractCalculatorView
 *
 * @constructor
 * @this {AbstractCalculatorView}
 *
 */
var AbstractCalculatorView = /** @class */ (function () {
    function AbstractCalculatorView() {
        this.events = new _EventEmitterModule_index__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.mathCore = new _MathModule_index__WEBPACK_IMPORTED_MODULE_1__["MathCore"]();
        this._protected__renderTemplate();
        this._private__findElements();
        this._protected__setHandlers();
        this._private__initializeEvents();
    }
    AbstractCalculatorView.prototype.setContext = function (context) {
        this.context = context;
    };
    AbstractCalculatorView.prototype._private__findElements = function () {
        var calculatorRootDomElement = document.querySelector('.calculator-altyair');
        this._protected__resultBlock = calculatorRootDomElement.querySelector('.calculator-altyair__result');
        this._private__actionsBlock = calculatorRootDomElement.querySelector('.calculator-altyair__actions');
    };
    /**
     * Assigning handlers
     *
     * @private
     * @this {SimpleCalculatorEnableStateView}
     */
    AbstractCalculatorView.prototype._private__initializeEvents = function () {
        this._private__actionsBlock.addEventListener('click', this._private__onClickAction.bind(this));
    };
    AbstractCalculatorView.prototype._private__onClickAction = function (event) {
        var action = event.target.dataset.action;
        if (action) {
            if (this._private__getHandler(action) === undefined) {
                return;
            }
            this._private__getHandler(action)(event.target.innerText);
        }
    };
    AbstractCalculatorView.prototype._private__getHandler = function (action) {
        return this._protected__handlers[action];
    };
    AbstractCalculatorView.prototype.render = function (message) {
        var _this = this;
        this._private__viewHistoryOperations = '';
        var parse = function (commands) {
            for (var i = 0; i < commands.length; i++) {
                var currentCommand = commands[i];
                if (currentCommand.value.constructor === Array) {
                    if (currentCommand.openGroup) {
                        _this._private__viewHistoryOperations += " [";
                    }
                    parse(currentCommand.value);
                    if (currentCommand.closeGroup) {
                        _this._private__viewHistoryOperations += " ]";
                    }
                    if (currentCommand.hasOwnProperty('action') && currentCommand.action !== null) {
                        _this._private__viewHistoryOperations += " " + currentCommand.action.icon;
                    }
                    continue;
                }
                var valueFormat = typeof currentCommand.value === "number" && currentCommand.value < 0 ? " (" + currentCommand.value + ")" : " " + currentCommand.value;
                _this._private__viewHistoryOperations += valueFormat;
                if (currentCommand.hasOwnProperty('action') && currentCommand.action !== null) {
                    _this._private__viewHistoryOperations += " " + currentCommand.action.icon;
                }
                if (currentCommand.closeGroup) {
                    _this._private__viewHistoryOperations += " ]";
                }
            }
        };
        parse(message.commands);
        this._protected__resultBlock.innerHTML = "<h5>" + this._private__viewHistoryOperations + "</h5><h3>" + message.result + "</h3>";
    };
    return AbstractCalculatorView;
}());
/* harmony default export */ __webpack_exports__["default"] = (AbstractCalculatorView);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MathCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MathCore", function() { return _MathCore__WEBPACK_IMPORTED_MODULE_0__["default"]; });




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Creates an instance MathCore.
 *
 * @constructor
 * @this {Math}
 *
 */
var MathCore = /** @class */ (function () {
    function MathCore() {
    }
    /**
     * Performs addition of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    MathCore.prototype.sum = function (a, b) {
        return a + b;
    };
    /**
     * Performs multiplication of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    MathCore.prototype.multiple = function (a, b) {
        return a * b;
    };
    /**
     * Performs division of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    MathCore.prototype.division = function (a, b) {
        return a / b;
    };
    /**
     * Performs subtraction of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    MathCore.prototype.subtraction = function (a, b) {
        return a - b;
    };
    /**
     * Calculates the root of a number
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     */
    MathCore.prototype.sqrt = function (a) {
        return Math.sqrt(a);
    };
    /**
     * Calculates the degree of number
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    MathCore.prototype.pow = function (a, b) {
        return Math.pow(a, b);
    };
    return MathCore;
}());
/* harmony default export */ __webpack_exports__["default"] = (MathCore);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Creates an instance SimpleCalculatorController.
 *
 * @constructor
 * @this {SimpleCalculatorController}
 *
 */
var SimpleCalculatorController = /** @class */ (function (_super) {
    __extends(SimpleCalculatorController, _super);
    function SimpleCalculatorController(calculatorCore, calculatorView) {
        return _super.call(this, calculatorCore, calculatorView) || this;
    }
    return SimpleCalculatorController;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorController"]));
/* harmony default export */ __webpack_exports__["default"] = (SimpleCalculatorController);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SimpleCalculatorEnableStateView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCalculatorEnableStateView", function() { return _SimpleCalculatorEnableStateView__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _SimpleCalculatorDisableStateView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCalculatorDisableStateView", function() { return _SimpleCalculatorDisableStateView__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _SimpleCalculatorDisableStateView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * Creates an instance SimpleCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {SimpleCalculatorEnableStateView}
 *
 */
var SimpleCalculatorEnableStateView = /** @class */ (function (_super) {
    __extends(SimpleCalculatorEnableStateView, _super);
    function SimpleCalculatorEnableStateView() {
        return _super.call(this) || this;
    }
    SimpleCalculatorEnableStateView.prototype._protected__setHandlers = function () {
        var self = this;
        this._protected__handlers = {
            onOff: function () {
                self.context.transitionTo(new (_SimpleCalculatorDisableStateView__WEBPACK_IMPORTED_MODULE_2__["default"]));
            },
            onDigit: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setDigit, message: { value: value } });
            },
            onAdd: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: self.mathCore.sum, priority: 0, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.add } });
            },
            onSubtract: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.subtract } });
            },
            onMultiply: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.multiply } });
            },
            onDivide: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: self.mathCore.division, priority: 1, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.divide } });
            },
            onOpenGroup: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: '', priority: 1, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.openGroup } });
            },
            onCloseGroup: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setAction, message: { action: '', priority: 1, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.operators.closeGroup } });
            },
            onUndo: function () {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setUndo });
            },
            onReset: function () {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_0__["default"].math.events.view.setReset });
            }
        };
    };
    SimpleCalculatorEnableStateView.prototype._protected__renderTemplate = function () {
        document.getElementsByClassName('calculator-altyair')[0].innerHTML = "\n            <div class=\"calculator-altyair__result\"></div>\n            <div class=\"calculator-altyair__actions\">\n                <div class=\"calculator-altyair__action\" data-action=\"onOff\">OFF</div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" style=\"width: calc(100% / 12 * 1.5 - 10px)\" data-action=\"onOpenGroup\">[</div>\n                <div class=\"calculator-altyair__action\" style=\"width: calc(100% / 12 * 1.5 - 10px)\" data-action=\"onCloseGroup\">]</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onReset\">\u0421</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onUndo\">x</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onPersent\">%</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDivide\">:</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">7</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">8</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">9</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onMultiply\">*</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">4</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">5</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">6</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onSubtract\">-</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">1</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">2</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">3</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onAdd\">+</div>\n            </div>";
    };
    return SimpleCalculatorEnableStateView;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_1__["AbstractCalculatorView"]));
/* harmony default export */ __webpack_exports__["default"] = (SimpleCalculatorEnableStateView);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _SimpleCalculatorEnableStateView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Creates an instance SimpleCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {SimpleCalculatorEnableStateView}
 *
 */
var SimpleCalculatorDisableStateView = /** @class */ (function (_super) {
    __extends(SimpleCalculatorDisableStateView, _super);
    function SimpleCalculatorDisableStateView() {
        return _super.call(this) || this;
    }
    SimpleCalculatorDisableStateView.prototype._protected__setHandlers = function () {
        var self = this;
        this._protected__handlers = {
            onActivate: function () {
                self.context.transitionTo(new _SimpleCalculatorEnableStateView__WEBPACK_IMPORTED_MODULE_1__["default"]());
            }
        };
    };
    SimpleCalculatorDisableStateView.prototype._protected__renderTemplate = function () {
        document.getElementsByClassName('calculator-altyair')[0].innerHTML = "\n            <div class=\"calculator-altyair__result\"></div>\n            <div class=\"calculator-altyair__actions\">\n                <div class=\"calculator-altyair__action\" data-action=\"onActivate\">On</div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div style=\"opacity: 0.5; display: flex; flex-wrap: wrap\">\n                    <div class=\"calculator-altyair__action\" data-action=\"onReset\">\u0421</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onUndo\">x</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onPersent\">%</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDivide\">:</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">7</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">8</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">9</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onMultiply\">*</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">4</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">5</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">6</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onSubtract\">-</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">1</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">2</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onDigit\">3</div>\n                    <div class=\"calculator-altyair__action\" data-action=\"onAdd\">+</div>\n                </div>\n            </div>";
    };
    SimpleCalculatorDisableStateView.prototype.render = function (message) {
        this._protected__resultBlock.innerHTML = "<h2>Calculator is OFF</h2>";
    };
    return SimpleCalculatorDisableStateView;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorView"]));
/* harmony default export */ __webpack_exports__["default"] = (SimpleCalculatorDisableStateView);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AdvancedCalculatorCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvancedCalculatorCore", function() { return _AdvancedCalculatorCore__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AdvancedCalculatorController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvancedCalculatorController", function() { return _AdvancedCalculatorController__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _AdvancedCalculatorView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdvancedCalculatorView", function() { return _AdvancedCalculatorView__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Creates an instance CalculatorCore.
 *
 * @constructor
 * @extends {AbstractCalculatorCore}
 * @this {AdvancedCalculatorCore}
 *
 */
var AdvancedCalculatorCore = /** @class */ (function (_super) {
    __extends(AdvancedCalculatorCore, _super);
    function AdvancedCalculatorCore() {
        return _super.call(this) || this;
    }
    return AdvancedCalculatorCore;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorCore"]));
/* harmony default export */ __webpack_exports__["default"] = (AdvancedCalculatorCore);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Creates an instance AdvancedCalculatorController.
 *
 * @constructor
 * @this {AdvancedCalculatorController}
 *
 */
var AdvancedCalculatorController = /** @class */ (function (_super) {
    __extends(AdvancedCalculatorController, _super);
    function AdvancedCalculatorController(calculatorCore, calculatorView) {
        return _super.call(this, calculatorCore, calculatorView) || this;
    }
    return AdvancedCalculatorController;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorController"]));
/* harmony default export */ __webpack_exports__["default"] = (AdvancedCalculatorController);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Abstract_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _config_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * Creates an instance AdvancedCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {AdvancedCalculatorView}
 *
 */
var AdvancedCalculatorView = /** @class */ (function (_super) {
    __extends(AdvancedCalculatorView, _super);
    function AdvancedCalculatorView() {
        return _super.call(this) || this;
    }
    AdvancedCalculatorView.prototype._protected__setHandlers = function () {
        var self = this;
        this._protected__handlers = {
            onDigit: function (value) {
                self.events.emit({ event: 'setDigit', message: { value: value } });
            },
            onSubtract: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_1__["default"].math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_1__["default"].math.operators.subtract } });
            },
            onMultiply: function (value) {
                self.events.emit({ event: _config_default__WEBPACK_IMPORTED_MODULE_1__["default"].math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: _config_default__WEBPACK_IMPORTED_MODULE_1__["default"].math.operators.multiply } });
            },
        };
    };
    AdvancedCalculatorView.prototype._protected__renderTemplate = function () {
        document.getElementById('calculator').innerHTML = "\n            <div class=\"result\" style=\"height: 200px; padding: 10px; border-bottom: 3px solid #cedece\"></div>\n            <div class=\"actions\" style=\"display: flex; flex-wrap: wrap\">\n                <div class=\"action\" data-action=\"onDigit\">7</div>\n                <div class=\"action\" data-action=\"onDigit\">8</div>\n                <div class=\"action\" data-action=\"onDigit\">9</div>\n                <div class=\"action\" data-action=\"onMultiply\">*</div>\n                <div class=\"action\" data-action=\"onDigit\">4</div>\n                <div class=\"action\" data-action=\"onDigit\">5</div>\n                <div class=\"action\" data-action=\"onDigit\">6</div>\n                <div class=\"action\" data-action=\"onSubtract\">-</div>\n            </div>";
    };
    return AdvancedCalculatorView;
}(_Abstract_index__WEBPACK_IMPORTED_MODULE_0__["AbstractCalculatorView"]));
/* harmony default export */ __webpack_exports__["default"] = (AdvancedCalculatorView);


/***/ })
/******/ ]);