import {EventEmitter} from '../../EventEmitterModule/index';
import {MathCore} from '../../MathModule/index';


/**
 * Creates an instance AbstractCalculatorView
 *
 * @constructor
 * @this {AbstractCalculatorView}
 *
 */
export default abstract class AbstractCalculatorView {
    public events: EventEmitter;
    public mathCore: MathCore;

    protected constructor () {
        this.events = new EventEmitter();
        this.mathCore = new MathCore();
    }

    abstract render( result: number ): void;

}
