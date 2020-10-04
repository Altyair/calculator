import {AbstractCalculatorCore, AbstractCalculatorController, AbstractCalculatorView} from "../MathCalculator/Abstract/index";

import {
    SimpleCalculatorCore,
    SimpleCalculatorCore_ver2,
    SimpleCalculatorController,
    SimpleCalculatorView
} from '../MathCalculator/SimpleCalculator/index';

import {
    AdvancedCalculatorCore,
    AdvancedCalculatorController,
    AdvancedCalculatorView,
} from '../MathCalculator/AdvancedCalculator/index';

interface IOptions {
    type: string;
}

/**
 * Creates an instance CalculatorFacade.
 *
 * @constructor
 * @this {CalculatorFacade}
 *
 */
export default class CalculatorFacade {

    private readonly _type: string;

    /**
     * Initializing the constructor
     *
     * @this {CalculatorFacade}
     * @param {Object} options Settings of calculator
     */
    constructor( options: IOptions ) {

        /**
         * Type of Calculator
         *
         * @private
         * @type {string}
         */
        this._type = options.type;
    }

    create() {
        let calculator: AbstractCalculatorController;
        if (this._type === 'simple') {

            const simpleCalculatorCore: AbstractCalculatorCore = new SimpleCalculatorCore_ver2();
            const simpleCalculatorView: AbstractCalculatorView = new SimpleCalculatorView();
            calculator = new SimpleCalculatorController(simpleCalculatorCore, simpleCalculatorView);

        } else if ( this._type === 'advanced' ) {

            const advancedCalculatorCore: AbstractCalculatorCore = new AdvancedCalculatorCore();
            const advancedCalculatorView: AbstractCalculatorView = new AdvancedCalculatorView();
            calculator = new AdvancedCalculatorController( advancedCalculatorCore, advancedCalculatorView );

        }

        return calculator;
    }
}
