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

    _private__setHandlers() {
        const self = this;

        this._private__handlers = {
            onOff() {
                self.context.transitionTo( new (SimpleCalculatorDisableStateView) );
            },

            onDigit( value: string ) {
                self.events.emit( { event: 'setDigit', message: { value }} );
            },

            onAdd: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.sum, priority: 0, icon: value}} );
            },

            onSubtract: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.subtraction, priority: 0, icon: value}} );
            },

            onMultiply: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.multiple, priority: 1, icon: value}} );
            },

            onDivide: ( value: string ) => {
                self.events.emit( { event: 'setAction', message: { action: self.mathCore.division, priority: 1, icon: value}} );
            },

            onUndo: () => {
                self.events.emit( { event: 'setUndo'} );
            },

            onReset: () => {
                self.events.emit( { event: 'setReset'} );
            }
        };
    }

    _private__renderTemplate(): void {
        document.getElementById('calculator').innerHTML = `
            <div class="result" style="height: 100px; padding: 10px; border-bottom: 1px solid gray"></div>
            <div class="actions" style="display: flex; flex-wrap: wrap">
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
