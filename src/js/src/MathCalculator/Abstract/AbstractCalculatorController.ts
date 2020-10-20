import config from "../../../config/default";
import {AbstractCalculatorCore, AbstractCalculatorView} from "../Abstract/index";

/**
 * Creates an instance AbstractCalculatorController.
 *
 * @constructor
 * @this {AbstractCalculatorController}
 *
 */
export default abstract class AbstractCalculatorController {

    protected _private__viewState: AbstractCalculatorView;
    protected readonly _private__calculatorCore: AbstractCalculatorCore;

    protected constructor (calculatorCore: AbstractCalculatorCore, calculatorView: AbstractCalculatorView ) {

        /**
         * Instance of AbstractCalculatorCore
         *
         * @private
         * @type {Object}
         */
        this._private__calculatorCore = calculatorCore;

        this.transitionTo(calculatorView);

    }

    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    public transitionTo(state: AbstractCalculatorView): void {
        this._private__viewState = state;
        this._private__initializeEvents();

        this._private__calculatorCore.setReset();
        this._private__viewState.setContext(this);
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {AbstractCalculatorController}
     */
    _private__initializeEvents() {
        this._private__viewState.events.subscribe( config.math.events.view.setDigit, this._private__onSetDigit.bind( this ) );
        this._private__viewState.events.subscribe( config.math.events.view.setAction, this._private__onSetAction.bind( this ) );
        this._private__viewState.events.subscribe( config.math.events.view.setUndo, this._private__onSetUndo.bind( this ) );
        this._private__viewState.events.subscribe( config.math.events.view.setReset, this._private__onSetReset.bind( this ) );

        this._private__calculatorCore.events.subscribe( config.math.events.core.changeCommands, this._private__onChangeCommands.bind( this ) );
    }

    _private__onSetDigit( event ): void {
        this._private__calculatorCore.setDigit( event.value );
    }

    _private__onSetAction( event ): void {
        this._private__calculatorCore.setAction( event );
    }

    _private__onSetUndo(): void {
        this._private__calculatorCore.setUndo();
    }

    _private__onSetReset(): void {
        this._private__calculatorCore.setReset();
    }

    _private__onChangeCommands( event ): void {
        this._private__viewState.render( event );
    }
}
