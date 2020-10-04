import {EventEmitter} from "../../EventEmitterModule/index";

/**
 * Creates an instance CalculatorAbstract
 *
 * @constructor
 * @this {AbstractCalculatorCore}
 *
 */
export default abstract class AbstractCalculatorCore {
    public events: EventEmitter;

    protected _commands: any[] = [{ value: 0 }];
    protected _result: number = 0;

    protected constructor () {

        /**
         * Instance of EventEmitter.
         *
         * @private
         * @type {Object}
         */
        this.events = new EventEmitter();
    }

    abstract setDigit( value: string ): void;
    abstract setAction( action: string ): void;
    abstract setUndo(): void

    setReset(): void {
        this._commands = [{value: 0}];

        this._calculateResultAndNotify();
    }

    _calculateResult(): void {
        const calculate = ( data ): number => {
            let result = data[0].value;

            data.forEach((currentCommand: any, index: number, array) => {
                const nextCommand: any = array[index + 1];

                if ( currentCommand.action && nextCommand ) {
                    const operand2 = nextCommand.value.constructor === Array ? calculate( nextCommand.value ) : nextCommand.value;

                    result = currentCommand.action.action( result, operand2 );
                }
            });

            return result;
        }

        this._result = calculate( this._commands );
    }

    _calculateResultAndNotify(): void {
        this._calculateResult();
        this.events.emit( { event: 'changeCommands', message: { commands: this._commands, result: this._result  }} );
    }

    getCommands(): any {
        return { commands: this._commands, result: this._result  }
    }
}
