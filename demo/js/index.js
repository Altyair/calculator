import {CalculatorFacade} from 'mathematical-calculator';

/**
 * Creates an instance Application.
 *
 * @constructor
 * @this {Application}
 *
 */
class Application {

    main() {
      this._createCalculator();
    }

    _createCalculator() {
        const calculator = new CalculatorFacade({type: 'simple'});
        calculator.create();
    }

}

window.onload = function() {
    const application = new Application();
    application.main();
};
