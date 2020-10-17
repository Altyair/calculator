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
    protected _private__resultBlock: any;
    protected _private__actionsBlock: any;
    protected _private__viewHistoryOperations: string;

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
        const calculatorRootDomElement = document.getElementById('calculator');

        this._private__resultBlock = calculatorRootDomElement.querySelector('.result');
        this._private__actionsBlock = calculatorRootDomElement.querySelector('.actions');
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
        console.log(message.commands);

        this._private__viewHistoryOperations = '';

        const parse = ( commands ) => {
            for ( let i = 0; i < commands.length; i++ ) {
                const currentCommand = commands[i];

                if (currentCommand.value.constructor === Array) {
                    parse(currentCommand.value);

                    if (currentCommand.hasOwnProperty('action')) {
                        this._private__viewHistoryOperations += ` ${currentCommand.action.icon}`;
                    }
                    continue;
                }

                const valueFormat: string = typeof currentCommand.value === "number" && currentCommand.value < 0 ? ` (${currentCommand.value})` : ` ${currentCommand.value}`;
                this._private__viewHistoryOperations += valueFormat;

                if (currentCommand.hasOwnProperty('action')) {
                    this._private__viewHistoryOperations += ` ${currentCommand.action.icon}`;
                }
            }
        };

        parse( message.commands );

        this._private__resultBlock.innerHTML = `<h5>${this._private__viewHistoryOperations}</h5><h3>${message.result}</h3>`;
    }

    abstract _protected__renderTemplate(): void;

    abstract _protected__setHandlers(): void;

}
