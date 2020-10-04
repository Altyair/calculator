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
        const calculator = new CalculatorFacade({type: config.type['simple']});
        calculator.create();
    }

}

const application = new Application();
application.main();
