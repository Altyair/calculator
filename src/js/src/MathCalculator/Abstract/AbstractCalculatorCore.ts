import config from '../../../config/default';
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
                    lastItem.value = !lastItem.value ? parseFloat(value) : parseFloat(lastItem.value + value);
                } else {
                    commands.push( { value: parseFloat( value ) } );
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
        const setAction = ( commands ): boolean => {
            const lastItem: any = commands[commands.length - 1];

            if (lastItem.hasOwnProperty('action')) {

                // case: 5 + [
                if (actionData.operator === config.math.operators.openGroup) {
                    console.log('case: 5 + [');

                    commands.push({openGroup: true, value: [{value: ''}]});
                    return true;
                }

                // case: 5 +:*-
                if (actionData.operator !== config.math.operators.closeGroup) {
                    console.log('case: 5 +:*-');

                    lastItem.action = actionData;
                    return true;
                }

            }

            if ( lastItem.value.constructor === Array ) {
                const setActionResult: boolean = setAction( lastItem.value);

                if (!setActionResult) {
                    if (actionData.operator === config.math.operators.closeGroup) {
                        if (lastItem.openGroup === true && !lastItem.closeGroup) {
                            lastItem.action = null;
                            lastItem.closeGroup = true;
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        lastItem.action = actionData;
                    }
                }
            } else {
                if (commands.length > 0) {

                    // case: ']'
                    if (actionData.operator === config.math.operators.closeGroup) {
                        console.log('case: a]');

                        //     lastItem.closeGroup = true;
                        //     return true;
                        // }

                        return false;
                    }

                    // case: '['
                    if (commands[commands.length - 1].action && actionData.operator === config.math.operators.openGroup) {
                        console.log('case: [a');

                        commands.push({openGroup: true, value: [{value: ''}]});

                        return true;
                    }

                    // case: 2 + 2 * 3
                    else if (commands.length > 1 && commands[commands.length - 2].action.priority < actionData.priority) {
                        console.log('case: a + b * c');

                        lastItem.value = [{value: lastItem.value, action: actionData}];
                    }

                    // case: 2 * (-5)
                    // case: 2 * +
                    else if (commands[commands.length - 1].action && commands[commands.length - 1].action.priority === 1 && actionData.priority === 0) {
                        console.log('case: a + b * (-c)');

                        if (actionData.operator === config.math.operators.subtract) {
                            commands.push({value: '-'});
                        }
                        return true;
                    }

                    // case: 2 * 5 -
                    // case: 2 * 5 +
                    else if (commands.length > 1 && commands[commands.length - 2].action.priority > actionData.priority) {
                        console.log('case: a * b + c');

                        return false;
                    }

                    // other cases
                    else {
                        console.log('case: a + b');
                        lastItem.action = actionData;
                    }

                }

                // case: first element
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
                        if ( this._private__commands.length > 1 ) {
                            this._private__commands.pop();
                        } else {
                            this._private__commands = [{value: 0}];
                        }
                    }
                }
            }
        }

        setUndo( this._private__commands );

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
            let result = data[0].value.constructor === Array ? calculate( data[0].value ) : ['-', '', 'empty'].indexOf(data[0].value) !== -1 ? 1 : data[0].value;

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
