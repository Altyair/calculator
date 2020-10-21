import config from '../../../../config/default';

import {AbstractCalculatorView} from '../../Abstract/index';
import SimpleCalculatorDisableStateView from './SimpleCalculatorDisableStateView';

/**
 * Creates an instance SimpleCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {SimpleCalculatorEnableStateView}
 *
 */
export default class SimpleCalculatorEnableStateView extends AbstractCalculatorView {

    constructor () {
        super();
    }

    _protected__setHandlers() {
        const self = this;

        this._protected__handlers = {
            onOff() {
                self.context.transitionTo( new (SimpleCalculatorDisableStateView) );
            },

            onDigit( value: string ) {
                self.events.emit( { event: config.math.events.view.setDigit, message: { value }} );
            },

            onAdd: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.sum, priority: 0, icon: value, operator: config.math.operators.add}} );
            },

            onSubtract: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.subtraction, priority: 0, icon: value, operator: config.math.operators.subtract}} );
            },

            onMultiply: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.multiple, priority: 1, icon: value, operator: config.math.operators.multiply}} );
            },

            onDivide: ( value: string ) => {
                self.events.emit( { event: config.math.events.view.setAction, message: { action: self.mathCore.division, priority: 1, icon: value, operator: config.math.operators.divide}} );
            },

            onUndo: () => {
                self.events.emit( { event: config.math.events.view.setUndo} );
            },

            onReset: () => {
                self.events.emit( { event: config.math.events.view.setReset} );
            }
        };
    }

    _protected__renderTemplate(): void {
        document.getElementById('calculator').innerHTML = `
            <div class="result"></div>
            <div class="actions">
                <div class="action" data-action="onOff">OFF</div>
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
