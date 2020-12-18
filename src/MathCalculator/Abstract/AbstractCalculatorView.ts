import {EventEmitter} from '../../EventEmitterModule/index';
import {MathCore} from '../../MathModule/index';
import AbstractCalculatorController from './AbstractCalculatorController';

/**
 * Creates an instance AbstractCalculatorView
 *
 * @constructor
 * @this {AbstractCalculatorView}
 *
 */
export default abstract class AbstractCalculatorView {
    public events: EventEmitter;
    public mathCore: MathCore;

    protected context: AbstractCalculatorController;

    protected _protected__handlers: any;
    protected _protected__resultBlock: any;
    private _private__actionsBlock: any;
    private _private__viewHistoryOperations: string;

    protected constructor () {
        this.events = new EventEmitter();
        this.mathCore = new MathCore();

        this._protected__renderTemplate();
        this._private__findElements();
        this._protected__setHandlers();
        this._private__initializeEvents();

    }

    public setContext(context: AbstractCalculatorController) {
        this.context = context;
    }

    _private__findElements(): void {
        const calculatorRootDomElement = document.querySelector('.calculator-altyair');

        this._protected__resultBlock = calculatorRootDomElement.querySelector('.calculator-altyair__result');
        this._private__actionsBlock = calculatorRootDomElement.querySelector('.calculator-altyair__actions');
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {SimpleCalculatorEnableStateView}
     */
    _private__initializeEvents() {
        this._private__actionsBlock.addEventListener('click', this._private__onClickAction.bind(this));
    }

    _private__onClickAction( event: any ) {
        const action: string = event.target.dataset.action;

        if (action) {
            if (this._private__getHandler(action) === undefined) {
                return;
            }

            this._private__getHandler(action)( event.target.innerText );
        }
    }

    _private__getHandler(action: string): any {
        return this._protected__handlers[action];
    }

    render( message: any ) {
        console.log(message);

        this._private__viewHistoryOperations = '';

        const parse = ( commands ) => {
            for ( let i = 0; i < commands.length; i++ ) {
                const currentCommand = commands[i];

                if (currentCommand.value.constructor === Array) {

                    if (currentCommand.openGroup) {
                        this._private__viewHistoryOperations += ` [`;
                    }

                    parse(currentCommand.value);

                    if (currentCommand.closeGroup) {
                        this._private__viewHistoryOperations += ` ]`;
                    }

                    if (currentCommand.hasOwnProperty('action') && currentCommand.action !== null) {
                        this._private__viewHistoryOperations += ` <strong>${currentCommand.action.icon}</strong>`;
                    }

                    continue;
                }

                const valueFormat: string = typeof currentCommand.value === "number" && currentCommand.value < 0 ? ` (${currentCommand.value})` : ` ${currentCommand.value}`;
                this._private__viewHistoryOperations += valueFormat;

                if (currentCommand.hasOwnProperty('action') && currentCommand.action !== null) {
                    this._private__viewHistoryOperations += ` <strong>${currentCommand.action.icon}</strong>`;
                }

                if (currentCommand.closeGroup) {
                    this._private__viewHistoryOperations += ` ]`;
                }
            }
        };

        parse( message.commands );

        this._protected__resultBlock.innerHTML = `<h3>${this._private__viewHistoryOperations}</h3><h2><strong>=</strong> ${message.result}</h2>`;
    }

    abstract _protected__renderTemplate(): void;

    abstract _protected__setHandlers(): void;

}
