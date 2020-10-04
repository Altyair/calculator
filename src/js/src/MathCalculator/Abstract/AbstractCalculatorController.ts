import {AbstractCalculatorCore, AbstractCalculatorView} from "../Abstract/index";

/**
 * Creates an instance AbstractCalculatorController.
 *
 * @constructor
 * @this {AbstractCalculatorController}
 *
 */
export default abstract class AbstractCalculatorController {

    protected readonly _view: AbstractCalculatorView;
    protected readonly _calculatorCore: AbstractCalculatorCore;

    protected constructor (calculatorCore: AbstractCalculatorCore, calculatorView: AbstractCalculatorView ) {

        /**
         * Instance of AdvancedCalculatorCore
         *
         * @private
         * @type {Object}
         */
        this._calculatorCore = calculatorCore;

        /**
         * Instance of AdvancedCalculatorView
         *
         * @private
         * @type {Object}
         */
        this._view = calculatorView;
        this._view.render(  this._calculatorCore.getCommands() );

        /**
         * Events initialization
         *
         * @private
         */
        this._initializeEvents();

    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {AbstractCalculatorController}
     */
    _initializeEvents() {
        this._view.events.subscribe( 'setDigit', this._onSetDigit.bind( this ) );
        this._view.events.subscribe( 'setAction', this._onSetAction.bind( this ) );
        this._view.events.subscribe( 'setUndo', this._onSetUndo.bind( this ) );
        this._view.events.subscribe( 'setReset', this._onSetReset.bind( this ) );

        this._calculatorCore.events.subscribe( 'changeCommands', this._onChangeCommands.bind( this ) );
    }

    _onSetDigit( event ) {
        this._calculatorCore.setDigit( event.value );
    }

    _onSetAction( event ) {
        this._calculatorCore.setAction( event );
    }

    _onSetUndo() {
        this._calculatorCore.setUndo();
    }

    _onSetReset() {
        this._calculatorCore.setReset();
    }

    _onChangeCommands( event ) {
        this._view.render( event );
    }
}
