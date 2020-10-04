import {AbstractCalculatorView} from '../Abstract/index';

/**
 * Creates an instance SimpleCalculatorView.
 *
 * @constructor
 * @extends {AbstractCalculatorView}
 * @this {SimpleCalculatorView}
 *
 */
export default class SimpleCalculatorView extends AbstractCalculatorView {
    private _resultBlock: any;
    private _actionsBlock: any;
    private _viewHistoryOperations: string = '';

    constructor () {
        super();

        this._renderTemplate();
        this._findElements();
        this._initializeEvents();
    }

    _renderTemplate(): void {
        document.getElementById('calculator').innerHTML = `
            <div class="result" style="height: 100px; padding: 10px; border-bottom: 1px solid gray"></div>
            <div class="actions" style="display: flex; flex-wrap: wrap">
                <div class="action" data-action="_onSetReset">С</div>
                <div class="action" data-action="_onSetUndo">x</div>
                <div class="action" data-action="_onSetPersent">%</div>
                <div class="action" data-action="_onSetDivide">:</div>
                <div class="action" data-action="_onSetDigit">7</div>
                <div class="action" data-action="_onSetDigit">8</div>
                <div class="action" data-action="_onSetDigit">9</div>
                <div class="action" data-action="_onSetMultiply">*</div>
                <div class="action" data-action="_onSetDigit">4</div>
                <div class="action" data-action="_onSetDigit">5</div>
                <div class="action" data-action="_onSetDigit">6</div>
                <div class="action" data-action="_onSetSubtract">-</div>
                <div class="action" data-action="_onSetDigit">1</div>
                <div class="action" data-action="_onSetDigit">2</div>
                <div class="action" data-action="_onSetDigit">3</div>
                <div class="action" data-action="_onSetAdd">+</div>
            </div>`;
    }

    _findElements(): void {
        const calculatorRootDomElement = document.getElementById('calculator');

        this._resultBlock = calculatorRootDomElement.querySelector('.result');
        this._actionsBlock = calculatorRootDomElement.querySelector('.actions');
    }

    /**
     * Assigning handlers
     *
     * @private
     * @this {SimpleCalculatorView}
     */
    _initializeEvents() {
        this._actionsBlock.addEventListener('click', this._onClickAction.bind(this));
    }

    _onClickAction( event: any ) {
        const action: string = event.target.dataset.action;
        if (action) {
            this[action]( event.target.innerText );
        }
    }

    _onSetAdd( value: string ) {
        this.events.emit( { event: 'setAction', message: { action: this.mathCore.sum, priority: 0, icon: value}} );
    }

    _onSetSubtract( value: string ) {
        this.events.emit( { event: 'setAction', message: { action: this.mathCore.subtraction, priority: 0, icon: value}} );
    }

    _onSetMultiply( value: string ) {
        this.events.emit( { event: 'setAction', message: { action: this.mathCore.multiple, priority: 1, icon: value}} );
    }

    _onSetDivide( value: string ) {
        this.events.emit( { event: 'setAction', message: { action: this.mathCore.division, priority: 1, icon: value}} );
    }

    _onSetDigit( value: string ) {
        this.events.emit( { event: 'setDigit', message: { value }} );
    }

    _onSetUndo() {
        this.events.emit( { event: 'setUndo'} );
    }

    _onSetReset() {
        this.events.emit( { event: 'setReset'} );
    }

    render( message: any ) {
        this._viewHistoryOperations = '';

        const parse = ( commands ) => {
            for ( let i = 0; i < commands.length; i++ ) {
                const currentCommand = commands[i];

                if (currentCommand.value.constructor === Array) {
                    parse(currentCommand.value);

                    if (currentCommand.hasOwnProperty('action')) {
                        this._viewHistoryOperations += ` ${currentCommand.action.icon}`;
                    }
                    continue;
                }

                this._viewHistoryOperations += ` ${currentCommand.value}`;

                if (currentCommand.hasOwnProperty('action')) {
                    this._viewHistoryOperations += ` ${currentCommand.action.icon}`;
                }
            }
        };

        parse( message.commands );

        this._resultBlock.innerHTML = `<h5>${this._viewHistoryOperations}</h5><h3>${message.result}</h3>`;
    }
}
