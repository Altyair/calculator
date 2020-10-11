import {AbstractCalculatorView} from '../Abstract/index';

/**
 * Creates an instance AdvancedCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {AdvancedCalculatorView}
 *
 */
export default class AdvancedCalculatorView extends AbstractCalculatorView {
    constructor () {
        super();
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {SimpleCalculatorEnableStateView}
     */
    _private__initializeEvents() {
        this._private__actionsBlock.addEventListener('click', this._private__onClickAction.bind(this));
    }

    public _private__setHandlers() {
        const self = this;

        this._private__handlers = {
            onDigit( value: string ) {
                self.events.emit( { event: 'setDigit', message: { value }} );
            },

            onSubtract: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.subtraction, priority: 0, icon: value}} );
            },

            onMultiply: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.multiple, priority: 1, icon: value}} );
            },
        };
    }


    _private__renderTemplate(): void {
        document.getElementById('calculator').innerHTML = `
            <div class="result" style="height: 200px; padding: 10px; border-bottom: 3px solid #cedece"></div>
            <div class="actions" style="display: flex; flex-wrap: wrap">
                <div class="action" data-action="onDigit">7</div>
                <div class="action" data-action="onDigit">8</div>
                <div class="action" data-action="onDigit">9</div>
                <div class="action" data-action="onMultiply">*</div>
                <div class="action" data-action="onDigit">4</div>
                <div class="action" data-action="onDigit">5</div>
                <div class="action" data-action="onDigit">6</div>
                <div class="action" data-action="onSubtract">-</div>
            </div>`;
    }
}
