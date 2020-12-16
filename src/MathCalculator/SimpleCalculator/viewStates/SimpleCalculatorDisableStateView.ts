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

    _protected__setHandlers() {
        const self = this;

        this._protected__handlers = {
            onActivate(): void {
                self.context.transitionTo( new SimpleCalculatorEnableStateView() );
            }
        }
    }

    _protected__renderTemplate(): void {
        document.getElementsByClassName('calculator-altyair')[0].innerHTML = `
            <div class="calculator-altyair__result"></div>
            <div class="calculator-altyair__actions">
                <div class="calculator-altyair__action" data-action="onActivate">On</div>
                <div class="calculator-altyair__action" data-action=""></div>
                <div class="calculator-altyair__action" data-action=""></div>
                <div class="calculator-altyair__action" data-action=""></div>
                <div style="opacity: 0.5; display: flex; flex-wrap: wrap">
                    <div class="calculator-altyair__action" data-action="onReset">С</div>
                    <div class="calculator-altyair__action" data-action="onUndo">x</div>
                    <div class="calculator-altyair__action" style="width: calc(100% / 12 * 1.5 - 10px)" data-action="onOpenGroup">[</div>
                    <div class="calculator-altyair__action" style="width: calc(100% / 12 * 1.5 - 10px)" data-action="onCloseGroup">]</div>
                    <div class="calculator-altyair__action" data-action=""></div>
                    
                    
                    <div class="calculator-altyair__action" data-action="onDigit">7</div>
                    <div class="calculator-altyair__action" data-action="onDigit">8</div>
                    <div class="calculator-altyair__action" data-action="onDigit">9</div>
                    <div class="calculator-altyair__action" data-action="onDivide">:</div>
                    
                    
                    <div class="calculator-altyair__action" data-action="onDigit">4</div>
                    <div class="calculator-altyair__action" data-action="onDigit">5</div>
                    <div class="calculator-altyair__action" data-action="onDigit">6</div>
                    <div class="calculator-altyair__action" data-action="onMultiply">*</div>
                    
                    
                    <div class="calculator-altyair__action" data-action="onDigit">1</div>
                    <div class="calculator-altyair__action" data-action="onDigit">2</div>
                    <div class="calculator-altyair__action" data-action="onDigit">3</div>
                    <div class="calculator-altyair__action" data-action="onSubtract">-</div>
                    
                    
                    <div class="calculator-altyair__action" style="width: calc(100% / 12 * 6 - 10px)" data-action="onDigit">0</div>
                    <div class="calculator-altyair__action" data-action="onDigit">,</div>
                    <div class="calculator-altyair__action" data-action="onAdd">+</div>
                </div>
            </div>`;
    }

    render( message: any ) {
        this._protected__resultBlock.innerHTML = `<h2>Calculator is OFF</h2>`;
    }

}
