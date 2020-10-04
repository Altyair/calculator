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
    private _resultBlock: any;
    private _actionsBlock: any;

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
                <div class="action digit">7</div>
                <div class="action digit">8</div>
                <div class="action digit">9</div>
                <div class="action multiply">*</div>
                <div class="action digit">4</div>
                <div class="action digit">5</div>
                <div class="action digit">6</div>
                <div class="action subtract">-</div>
                <div class="action digit">1</div>
                <div class="action digit">2</div>
                <div class="action digit">3</div>
                <div class="action sum">+</div>
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
     * @this {AdvancedCalculatorView}
     */
    _initializeEvents() {

        this._actionsBlock.addEventListener('click', this._onClickAction.bind(this));

    }

    _onClickAction( event: any ) {
        // переписать
        if ( event.target.className.indexOf( 'sum' ) !== -1 ) {
            this.events.emit( { event: 'setSumAction'} );
        }  else if ( event.target.className.indexOf( 'multiply' ) !== -1 ) {
            this.events.emit( { event: 'setMultiplyAction'} );
        }  else if ( event.target.className.indexOf( 'subtract' ) !== -1 ) {
            this.events.emit( { event: 'setSubtractAction'} );
        }  else if ( event.target.className.indexOf( 'digit' ) !== -1 ) {
            this.events.emit( { event: 'setDigit', message: { value: event.target.innerText }} );
        }
    }

    render( message: any ) {

        console.log( message );

        let strResult: string = '';

        const parse = ( commands ) => {

            for ( let i = 0; i < commands.length; i++ ) {
                const currentCommand = commands[i];

                if (currentCommand.value.constructor === Array) {
                    parse(currentCommand.value);

                    if (currentCommand.hasOwnProperty('action')) {
                        strResult += ` ${currentCommand.action.icon}`;
                    }
                    continue;
                }

                strResult += ` ${currentCommand.value}`;

                if (currentCommand.hasOwnProperty('action')) {
                    strResult += ` ${currentCommand.action.icon}`;
                }
            }
        };

        parse( message.commands );

        this._resultBlock.innerHTML = `
            <h5>${strResult}</h5>
            <h3>${message.result}</h3>`;
    }
}
