import {AbstractCalculatorCore} from "../Abstract/index";

export default class SimpleCalculatorCore extends AbstractCalculatorCore {
    constructor () {
        super ();
    }

    setDigit( value: string ): void {
        const lastItem: any = this._commands[this._commands.length - 1];

        if ( !lastItem.hasOwnProperty('action') ) {
            if (lastItem.value.constructor === Array) {
                const commands: any[] = lastItem.value;
                const lastCommand = commands[commands.length - 1];

                if ( !lastCommand.hasOwnProperty('action') ) {
                    lastCommand.value = !lastCommand.value ? parseFloat(value) : parseFloat(lastCommand.value + value);
                } else {
                    commands.push( { value: parseInt( value, 10 ) } );
                }
            } else {
                lastItem.value = !lastItem.value ? parseFloat(value) : parseFloat(lastItem.value + value);
            }
        } else {
            this._commands.push( { value: parseFloat( value ) } );
        }

        this._calculateResultAndNotify();
    }

    // переписать через рекурсию
    setAction( actionData: any ): void {
        const lastItem: any = this._commands[this._commands.length - 1];

        if ( lastItem.value.constructor === Array ) {
            const commands: any[] = lastItem.value;
            const lastCommand = commands[commands.length - 1];

            if ( actionData.priority === 0 ) {
                lastItem.action = actionData;
            } else {
                lastCommand.action = actionData;
            }
        } else {
            if ( actionData.priority === 0 || this._commands.length === 1) {
                lastItem.action = actionData;
            } else {
                lastItem.value = [ { value: lastItem.value, action: actionData } ]
            }
        }

        this._calculateResultAndNotify();
    }

    // переписать через рекурсию
    setUndo(): void {
        const lastItem: any = this._commands[this._commands.length - 1];

        if ( lastItem.value.constructor === Array ) {
            let commands: any[] = lastItem.value;
            const lastCommand = commands[commands.length - 1];
            const lastItemValue: string = String( lastCommand.value );

            if ( lastCommand.action ) {
                delete lastCommand.action;
            } else if ( lastItemValue.length > 1) {
                lastCommand.value = parseFloat(lastItemValue.slice(0, -1));
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
        } else {
            const lastItemValue: string = String( lastItem.value );
            if ( lastItem.action ) {
                delete lastItem.action;
            } else if ( lastItemValue.length > 1) {
                lastItem.value = parseFloat(lastItemValue.slice(0, -1));
            } else if ( lastItemValue.length === 1 ) {
                if ( this._commands.length > 1 ) {
                    this._commands.pop();
                } else {
                    this._commands = [{value: 0}];
                }
            }
        }

        this._calculateResultAndNotify();
    }

    setReset() {
        super.setReset();
    }

    getCommands() {
        return super.getCommands();
    }
}
