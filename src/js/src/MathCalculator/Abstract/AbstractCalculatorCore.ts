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

    setDigit( value: string ): void {
        const setDigit = ( commands ): void => {
            const lastItem: any = commands[commands.length - 1];

            if ( lastItem.value.constructor === Array && !lastItem.hasOwnProperty('action') ) {
                setDigit( lastItem.value );
            } else {
                if ( !lastItem.hasOwnProperty('action') ) {
                    lastItem.value = !lastItem.value ? parseFloat(value) : parseFloat(lastItem.value + value);
                } else {
                    commands.push( { value: parseFloat( value ) } );
                }
            }
        }

        setDigit( this._commands );

        this._calculateResultAndNotify();
    }

    setAction( actionData: any ): void {

        const setAction = ( commands ): boolean => {
            const lastItem: any = commands[commands.length - 1];

            if ( lastItem.value.constructor === Array) {
                if (!setAction( lastItem.value)) {
                    lastItem.action = actionData;
                }
            } else {
                if (commands.length > 0) {
                    if (commands.length > 1 && commands[commands.length - 2].action.priority === 0 && actionData.priority === 1) {
                        lastItem.value = [{value: lastItem.value, action: actionData}];
                    }
                    else if (commands[commands.length - 1].action && commands[commands.length - 1].action.priority === 1 && actionData.priority === 0) {
                        if (actionData.icon === '+') {

                        } else if (actionData.icon === '-') {
                            commands.push({value: '-'});
                        }
                        return true;
                    }
                    else if (commands.length > 1 && commands[commands.length - 2].action && commands[commands.length - 2].action.priority === 1 && actionData.priority === 0) {
                        return false;
                    } else {
                        lastItem.action = actionData;
                    }

                } else {
                    lastItem.action = actionData;
                }

                return true;
            }
        }

        if (!setAction( this._commands )) {
            this._commands[this._commands.length - 1].action = actionData;
        }

        this._calculateResultAndNotify();
    }

    setUndo(): void {
        const setUndo = ( commands ): void => {
            const lastItem: any = commands[commands.length - 1];

            if ( lastItem.value.constructor === Array ) {
                setUndo( lastItem.value );
            } else {
                const lastItemValue: string = String( lastItem.value );

                if (  lastItem.action ) {
                    delete lastItem.action;
                } else if ( lastItemValue.length > 1 ) {
                    lastItem.value = parseFloat( lastItemValue.slice(0, -1) );
                } else if ( lastItemValue.length === 1 ) {
                    if ( commands.length > 1 ) {
                        commands.pop();
                    } else {
                        if ( this._commands.length > 1 ) {
                            this._commands.pop();
                        } else {
                            this._commands = [{value: 0}];
                        }
                    }
                }
            }
        }

        setUndo( this._commands );

        this._calculateResultAndNotify();
    }

    setReset(): void {
        this._commands = [{value: 0}];

        this._calculateResultAndNotify();
    }

    _calculateResult(): void {
        const calculate = ( data ): number => {
            let result = data[0].value.constructor === Array ? calculate( data[0].value ) : data[0].value;

            data.forEach((currentCommand: any, index: number, array) => {
                const nextCommand: any = array[index + 1];

                if ( currentCommand.action && nextCommand ) {
                    let operand2 = nextCommand.value.constructor === Array ? calculate( nextCommand.value ) : nextCommand.value;

                    if (operand2 === '-') {
                        operand2 = 1;
                    }

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
