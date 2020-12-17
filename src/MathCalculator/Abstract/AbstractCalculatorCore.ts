import config from '../../config/default';
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

    private _private__commands: any[] = [{ value: 0 }];
    private _private__result: number = 0;

    protected constructor () {

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
    setDigit( value: string ): void {
        const setDigit = ( commands ): void => {
            const lastItem: any = commands[commands.length - 1];

            if ( lastItem.value.constructor === Array && !lastItem.hasOwnProperty('action') ) {
                if (!lastItem.value.length) {
                    commands.push( { value: parseFloat( value ) } );
                } else {
                    setDigit( lastItem.value );
                }
            } else {
                if ( !lastItem.hasOwnProperty('action') ) {
                    if ( value === '.' && String(lastItem.value).indexOf('.') !== -1 ) {
                        return;
                    }

                    lastItem.value = !lastItem.value && value !== '.' ? parseFloat(value) : String(lastItem.value + value);
                } else {
                    if ( value !== '.' ) {
                        commands.push( { value: value } );
                    }
                }
            }
        }

        setDigit( this._private__commands );

        this._private__calculateResultAndNotify();
    }

    /**
     * Set action value
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    setAction( actionData: any ): void {
        const openGroup: string = config.math.operators.openGroup;
        const closeGroup: string = config.math.operators.closeGroup;

        const setAction = ( commands ): boolean => {
            const lastItem: any = commands[commands.length - 1];

            if (lastItem.hasOwnProperty('action')) {
                if (actionData.operator === openGroup && lastItem.action) {
                    commands.push({openGroup: true, value: [{value: ''}]});
                    return true;
                }

                if (actionData.operator !== closeGroup && actionData.operator !== openGroup) {
                    if (lastItem.action && lastItem.action.priority === 1 && actionData.priority === 0) {
                        if (actionData.operator === config.math.operators.subtract) {
                            commands.push({value: '-'});
                            return true;
                        }
                    }

                    lastItem.action = actionData;
                    return true;
                }
            }

            if ( lastItem.value.constructor === Array ) {
                const setActionResult: boolean = setAction( lastItem.value);

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
            } else {

                if (lastItem.hasOwnProperty('value') && lastItem.value === '') {
                    return true;
                }

                if (actionData.operator === closeGroup) {
                    return !(commands.length > 1 && !lastItem.hasOwnProperty('action'));
                }

                if (actionData.operator === openGroup) {
                    return true;
                }

                else if (commands.length > 1 && commands[commands.length - 2].action.priority < actionData.priority) {
                    lastItem.value = [{value: lastItem.value, action: actionData}];
                }

                else {
                    lastItem.action = actionData;
                }

            }

            return true;

        }

        if (!setAction( this._private__commands )) {
            if (actionData.operator !== config.math.operators.closeGroup) {
                this._private__commands[this._private__commands.length - 1].action = actionData;
            }
        }

        this._private__calculateResultAndNotify();
    }

    /**
     * Set undo
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    setUndo(): void {
        const setUndo = ( commands ): boolean => {
            const lastItem: any = commands[commands.length - 1];

            if (lastItem.closeGroup) {
                lastItem.closeGroup = null;

                return true;
            }

            else if ( lastItem.value.constructor === Array ) {
                const result: boolean = setUndo( lastItem.value );

                if (!result) {
                    commands.pop();

                    return true;
                }
            }
            else {
                const lastItemValue: string = String( lastItem.value );

                if (  lastItem.action ) {

                    delete lastItem.action;

                } else if ( lastItemValue.length > 1 ) {

                    lastItem.value = parseFloat( lastItemValue.slice(0, -1) );

                } else if ( lastItemValue.length === 1 ) {
                    if ( commands.length > 1 ) {
                        commands.pop();

                        return true;
                    } else {
                        return false;
                    }
                }
            }

            return true;
        }

        if (!setUndo( this._private__commands )) {
            this._private__commands = [{value: 0}];
        }

        this._private__calculateResultAndNotify();
    }

    /**
     * Set reset
     *
     * @public
     * @this {AbstractCalculatorCore}
     */
    setReset(): void {
        this._private__commands = [{value: 0}];

        this._private__calculateResultAndNotify();
    }

    _private__calculateResult(): void {
        const calculate = ( data ): number => {
            const value: any =  data[0].value;

            if (value === '') {
                return null;
            }

            let result = value.constructor === Array ? calculate( value ) : ['-'].indexOf(value) !== -1 ? 1 : value;

            data.forEach((currentCommand: any, index: number, array) => {
                const nextCommand: any = array[index + 1];

                if ( currentCommand.action && nextCommand) {
                    let operand2: any = nextCommand.value.constructor === Array ? calculate( nextCommand.value ) : nextCommand.value;

                    if (operand2 !== null) {
                        if (operand2 === '-') {
                            operand2 = 1;
                        }

                        if (operand2) {
                            result = currentCommand.action.action(parseFloat(result), parseFloat(operand2));
                        }
                    }
                }
            });

            return result;
        }

        this._private__result = calculate( this._private__commands );
    }

    _private__calculateResultAndNotify(): void {
        this._private__calculateResult();

        this.events.emit( { event: 'changeCommands', message: { commands: this._private__commands, result: this._private__result  }} );
    }

    getCommands(): any {
        return { commands: this._private__commands, result: this._private__result  }
    }
}
