import config from '../../../config/default';

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
                self.events.emit( {
                    event: config.math.events.view.setDigit,
                    message: { value }
                } );
            },

            onAdd: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: self.mathCore.sum,
                        priority: 0, icon: value,
                        operator: config.math.operators.add
                    }
                } );
            },

            onSubtract: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: self.mathCore.subtraction,
                        priority: 0, icon: value,
                        operator: config.math.operators.subtract
                    }
                } );
            },

            onMultiply: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: self.mathCore.multiple,
                        priority: 1, icon: value,
                        operator: config.math.operators.multiply
                    }
                } );
            },

            onDivide: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: self.mathCore.division,
                        priority: 1, icon: value,
                        operator: config.math.operators.divide
                    }
                } );
            },

            onOpenGroup: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: '',
                        priority: 1, icon: value,
                        operator: config.math.operators.openGroup
                    }
                } );
            },

            onCloseGroup: ( value: string ) => {
                self.events.emit( {
                    event: config.math.events.view.setAction,
                    message: {
                        action: '',
                        priority: 1,
                        icon: value,
                        operator: config.math.operators.closeGroup
                    }
                } );
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
        document.getElementsByClassName('calculator-altyair')[0].innerHTML = `
            <div class="calculator-altyair__result"></div>
            <div class="calculator-altyair__actions">
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onOff">OFF</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action=""></div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action=""></div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action=""></div>
                
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onReset">С</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onUndo">x</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" style="width: calc(100% / 12 * 1.5 - 10px)" data-action="onOpenGroup">[</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" style="width: calc(100% / 12 * 1.5 - 10px)" data-action="onCloseGroup">]</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action=""></div>
                
                
                <div class="calculator-altyair__action" data-action="onDigit">7</div>
                <div class="calculator-altyair__action" data-action="onDigit">8</div>
                <div class="calculator-altyair__action" data-action="onDigit">9</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onDivide">/</div>
                
                
                <div class="calculator-altyair__action" data-action="onDigit">4</div>
                <div class="calculator-altyair__action" data-action="onDigit">5</div>
                <div class="calculator-altyair__action" data-action="onDigit">6</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onMultiply">*</div>
                
                
                <div class="calculator-altyair__action" data-action="onDigit">1</div>
                <div class="calculator-altyair__action" data-action="onDigit">2</div>
                <div class="calculator-altyair__action" data-action="onDigit">3</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onSubtract">-</div>
                
                
                <div class="calculator-altyair__action" style="width: calc(100% / 12 * 6 - 10px)" data-action="onDigit">0</div>
                <div class="calculator-altyair__action" data-action="onDigit">.</div>
                <div class="calculator-altyair__action calculator-altyair__action_operation" data-action="onAdd">+</div>
            </div>`;
    }
}
