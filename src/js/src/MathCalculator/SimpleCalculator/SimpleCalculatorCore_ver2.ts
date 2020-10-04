import {AbstractCalculatorCore} from "../Abstract/index";

export default class SimpleCalculatorCore_ver2 extends AbstractCalculatorCore {
    constructor () {
        super ();
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
        const setAction = ( commands ): void => {
            const lastItem: any = commands[commands.length - 1];

            if ( lastItem.value.constructor === Array ) {
                setAction( lastItem.value );
            } else {
                if (  actionData.priority === 0 || this._commands.length === 1 ) {
                    lastItem.action = actionData;
                } else {
                    lastItem.value = [ { value: lastItem.value, action: actionData } ]
                }
            }
        }

        setAction( this._commands );

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

    setReset() {
        super.setReset();
    }

    getCommands(): any {
        return super.getCommands();
    }
}
