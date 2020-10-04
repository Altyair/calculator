import {AbstractCalculatorController, AbstractCalculatorCore, AbstractCalculatorView} from "../Abstract/index";

/**
 * Creates an instance SimpleCalculatorController.
 *
 * @constructor
 * @this {SimpleCalculatorController}
 *
 */
export default class SimpleCalculatorController extends AbstractCalculatorController {

    constructor ( calculatorCore: AbstractCalculatorCore, calculatorView: AbstractCalculatorView ) {
        super( calculatorCore, calculatorView );
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {SimpleCalculatorController}
     */
    _initializeEvents() {
        super._initializeEvents();

        // additional functionality

    }
}
