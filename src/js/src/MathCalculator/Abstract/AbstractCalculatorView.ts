import {EventEmitter} from '../../EventEmitterModule/index';
import {MathCore} from '../../MathModule/index';


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

    protected _private__handlers: any;
    private _private__resultBlock: any;
    private _private__actionsBlock: any;
    private _private__viewHistoryOperations: string;

    protected constructor () {
        this.events = new EventEmitter();
        this.mathCore = new MathCore();

        this._private__renderTemplate();
        this._private__findElements();
        this._private__setHandlers();
        this._private__initializeEvents();

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
     * @this {AbstractCalculatorView}
     */
    _private__initializeEvents() {
        this._private__actionsBlock.addEventListener('click', this._private__onClickAction.bind(this));
    }

    _private__onClickAction( event: any ) {
        const action: string = event.target.dataset.action;

        if (action) {
            this._private__getHandler(action)( event.target.innerText );
        }
    }

    _private__getHandler(action: string): any {
        return this._private__handlers[action];
    }

    render( message: any ) {
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

                this._private__viewHistoryOperations += ` ${currentCommand.value}`;

                if (currentCommand.hasOwnProperty('action')) {
                    this._private__viewHistoryOperations += ` ${currentCommand.action.icon}`;
                }
            }
        };

        parse( message.commands );

        this._private__resultBlock.innerHTML = `<h5>${this._private__viewHistoryOperations}</h5><h3>${message.result}</h3>`;
    }

    abstract _private__setHandlers(): void;

    abstract _private__renderTemplate(): void;

}
