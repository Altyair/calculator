var config = {
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
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 *
 * Observer
 *
 *
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._subscribers = {};
    }
    EventEmitter.prototype.emit = function (data) {
        var event = data.event;
        if (this._subscribers.hasOwnProperty(event)) {
            for (var _i = 0, _a = this._subscribers[event]; _i < _a.length; _i++) {
                var subscriber = _a[_i];
                subscriber(data.message);
            }
        }
    };
    EventEmitter.prototype.subscribe = function (event, callback) {
        if (!this._subscribers.hasOwnProperty(event)) {
            this._subscribers[event] = [];
        }
        this._subscribers[event].push(callback);
    };
    return EventEmitter;
}());

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
        this.events = new EventEmitter();
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
        var openGroup = config.math.operators.openGroup;
        var closeGroup = config.math.operators.closeGroup;
        var setAction = function (commands) {
            var lastItem = commands[commands.length - 1];
            if (lastItem.hasOwnProperty('action')) {
                if (actionData.operator === openGroup && lastItem.action) {
                    commands.push({ openGroup: true, value: [{ value: '' }] });
                    return true;
                }
                if (actionData.operator !== closeGroup && actionData.operator !== openGroup) {
                    if (lastItem.action && lastItem.action.priority === 1 && actionData.priority === 0) {
                        if (actionData.operator === config.math.operators.subtract) {
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
            if (actionData.operator !== config.math.operators.closeGroup) {
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
        this._private__viewState.events.subscribe(config.math.events.view.setDigit, this._private__onSetDigit.bind(this));
        this._private__viewState.events.subscribe(config.math.events.view.setAction, this._private__onSetAction.bind(this));
        this._private__viewState.events.subscribe(config.math.events.view.setUndo, this._private__onSetUndo.bind(this));
        this._private__viewState.events.subscribe(config.math.events.view.setReset, this._private__onSetReset.bind(this));
        this._private__calculatorCore.events.subscribe(config.math.events.core.changeCommands, this._private__onChangeCommands.bind(this));
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

/**
 * Creates an instance AbstractCalculatorView
 *
 * @constructor
 * @this {AbstractCalculatorView}
 *
 */
var AbstractCalculatorView = /** @class */ (function () {
    function AbstractCalculatorView() {
        this.events = new EventEmitter();
        this.mathCore = new MathCore();
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

var SimpleCalculatorCore_ver2 = /** @class */ (function (_super) {
    __extends(SimpleCalculatorCore_ver2, _super);
    function SimpleCalculatorCore_ver2() {
        return _super.call(this) || this;
    }
    return SimpleCalculatorCore_ver2;
}(AbstractCalculatorCore));

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
}(AbstractCalculatorController));

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
                self.context.transitionTo(new SimpleCalculatorEnableStateView());
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
}(AbstractCalculatorView));

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
                self.context.transitionTo(new (SimpleCalculatorDisableStateView));
            },
            onDigit: function (value) {
                self.events.emit({ event: config.math.events.view.setDigit, message: { value: value } });
            },
            onAdd: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.sum, priority: 0, icon: value, operator: config.math.operators.add } });
            },
            onSubtract: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: config.math.operators.subtract } });
            },
            onMultiply: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: config.math.operators.multiply } });
            },
            onDivide: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.division, priority: 1, icon: value, operator: config.math.operators.divide } });
            },
            onOpenGroup: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: '', priority: 1, icon: value, operator: config.math.operators.openGroup } });
            },
            onCloseGroup: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: '', priority: 1, icon: value, operator: config.math.operators.closeGroup } });
            },
            onUndo: function () {
                self.events.emit({ event: config.math.events.view.setUndo });
            },
            onReset: function () {
                self.events.emit({ event: config.math.events.view.setReset });
            }
        };
    };
    SimpleCalculatorEnableStateView.prototype._protected__renderTemplate = function () {
        document.getElementsByClassName('calculator-altyair')[0].innerHTML = "\n            <div class=\"calculator-altyair__result\"></div>\n            <div class=\"calculator-altyair__actions\">\n                <div class=\"calculator-altyair__action\" data-action=\"onOff\">OFF</div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" data-action=\"\"></div>\n                <div class=\"calculator-altyair__action\" style=\"width: calc(100% / 12 * 1.5 - 10px)\" data-action=\"onOpenGroup\">[</div>\n                <div class=\"calculator-altyair__action\" style=\"width: calc(100% / 12 * 1.5 - 10px)\" data-action=\"onCloseGroup\">]</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onReset\">\u0421</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onUndo\">x</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onPersent\">%</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDivide\">:</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">7</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">8</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">9</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onMultiply\">*</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">4</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">5</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">6</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onSubtract\">-</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">1</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">2</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onDigit\">3</div>\n                <div class=\"calculator-altyair__action\" data-action=\"onAdd\">+</div>\n            </div>";
    };
    return SimpleCalculatorEnableStateView;
}(AbstractCalculatorView));

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
}(AbstractCalculatorCore));

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
}(AbstractCalculatorController));

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
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: config.math.operators.subtract } });
            },
            onMultiply: function (value) {
                self.events.emit({ event: config.math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: config.math.operators.multiply } });
            }
        };
    };
    AdvancedCalculatorView.prototype._protected__renderTemplate = function () {
        document.getElementById('calculator').innerHTML = "\n            <div class=\"result\" style=\"height: 200px; padding: 10px; border-bottom: 3px solid #cedece\"></div>\n            <div class=\"actions\" style=\"display: flex; flex-wrap: wrap\">\n                <div class=\"action\" data-action=\"onDigit\">7</div>\n                <div class=\"action\" data-action=\"onDigit\">8</div>\n                <div class=\"action\" data-action=\"onDigit\">9</div>\n                <div class=\"action\" data-action=\"onMultiply\">*</div>\n                <div class=\"action\" data-action=\"onDigit\">4</div>\n                <div class=\"action\" data-action=\"onDigit\">5</div>\n                <div class=\"action\" data-action=\"onDigit\">6</div>\n                <div class=\"action\" data-action=\"onSubtract\">-</div>\n            </div>";
    };
    return AdvancedCalculatorView;
}(AbstractCalculatorView));

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
        if (this._private__type === config.math.type.simple) {
            var simpleCalculatorCore = new SimpleCalculatorCore_ver2();
            var simpleCalculatorView = new SimpleCalculatorEnableStateView();
            calculator = new SimpleCalculatorController(simpleCalculatorCore, simpleCalculatorView);
        }
        else if (this._private__type === config.math.type.advanced) {
            var advancedCalculatorCore = new AdvancedCalculatorCore();
            var advancedCalculatorView = new AdvancedCalculatorView();
            calculator = new AdvancedCalculatorController(advancedCalculatorCore, advancedCalculatorView);
        }
        return calculator;
    };
    return CalculatorFacade;
}());

export { CalculatorFacade };
