import config from './config/default'
import { CalculatorFacade } from './src/CalculatorFacade/index';

/**
 * Creates an instance Application.
 *
 * @constructor
 * @this {Application}
 *
 */
class Application {

    main() {
      Application._createCalculator();
    }

    private static _createCalculator(): void {
        const calculator = new CalculatorFacade({type: 'simple'});
        calculator.create();
    }

}

const application = new Application();
application.main();
