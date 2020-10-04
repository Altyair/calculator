import {AbstractCalculatorController, AbstractCalculatorCore, AbstractCalculatorView} from "../Abstract/index";

/**
 * Creates an instance AdvancedCalculatorController.
 *
 * @constructor
 * @this {AdvancedCalculatorController}
 *
 */
export default class  AdvancedCalculatorController extends AbstractCalculatorController {

    constructor ( calculatorCore: AbstractCalculatorCore, calculatorView: AbstractCalculatorView ) {
        super( calculatorCore, calculatorView );
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {AdvancedCalculatorController}
     */
    _initializeEvents() {
        super._initializeEvents();

        // additional functionality

    }
}
