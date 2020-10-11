import {AbstractCalculatorView} from '../../Abstract/index';
import SimpleCalculatorEnableStateView from './SimpleCalculatorEnableStateView';

/**
 * Creates an instance SimpleCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {SimpleCalculatorEnableStateView}
 *
 */
export default class SimpleCalculatorDisableStateView extends AbstractCalculatorView {

    constructor () {
        super();
    }

    _private__setHandlers() {
        const self = this;

        this._private__handlers = {
            onActivate() {
                self.context.transitionTo( new SimpleCalculatorEnableStateView() );
            }
        }
    }

    _private__renderTemplate(): void {
        document.getElementById('calculator').innerHTML = `
            <div class="result" style="height: 100px; padding: 10px; border-bottom: 1px solid gray"></div>
            <div class="actions" style="display: flex; flex-wrap: wrap; opacity: 0.7">
                <div class="action" data-action="onActivate">On</div>
                <div class="action" data-action=""></div>
                <div class="action" data-action=""></div>
                <div class="action" data-action=""></div>
                <div class="action" data-action="onReset">С</div>
                <div class="action" data-action="onUndo">x</div>
                <div class="action" data-action="onPersent">%</div>
                <div class="action" data-action="onDivide">:</div>
                <div class="action" data-action="onDigit">7</div>
                <div class="action" data-action="onDigit">8</div>
                <div class="action" data-action="onDigit">9</div>
                <div class="action" data-action="onMultiply">*</div>
                <div class="action" data-action="onDigit">4</div>
                <div class="action" data-action="onDigit">5</div>
                <div class="action" data-action="onDigit">6</div>
                <div class="action" data-action="onSubtract">-</div>
                <div class="action" data-action="onDigit">1</div>
                <div class="action" data-action="onDigit">2</div>
                <div class="action" data-action="onDigit">3</div>
                <div class="action" data-action="onAdd">+</div>
            </div>`;
    }

}
