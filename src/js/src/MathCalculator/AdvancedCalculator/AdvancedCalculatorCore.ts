import {AbstractCalculatorCore} from '../Abstract/index';

/**
 * Creates an instance CalculatorCore.
 *
 * @constructor
 * @extends {AbstractCalculatorCore}
 * @this {AdvancedCalculatorCore}
 *
 */
export default class AdvancedCalculatorCore extends AbstractCalculatorCore {

    private readonly _actions: any;

    constructor () {
        super ();
    }

    setDigit( value: string ): void {}

    setAction( action:string ): void {}

    setUndo(): void {

    }

    setReset(): void {

    }

    _calculateResult(): void {}

    getCommands() {}
}
