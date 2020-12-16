import {AbstractCalculatorView} from '../Abstract/index';
import config from "../../config/default";

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

    public _protected__setHandlers() {
        const self = this;

        this._protected__handlers = {
            onDigit( value: string ) {
                self.events.emit( { event: 'setDigit', message: { value }} );
            },

            onSubtract: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: config.math.operators.subtract}} );
            },

            onMultiply: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: config.math.operators.multiply}} );
            },
        };
    }

    _protected__renderTemplate(): void {
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
